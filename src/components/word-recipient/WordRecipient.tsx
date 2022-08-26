import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchWordsForGame } from '../../store/thunks';
import { PageData, PageUserData } from '../../store/types';

const WordRecipient: FC = () => {
  const {
    wordsSource,
    gameType,
    currentPageData,
  } = useAppSelector((state) => state.currentGame);
  const dispatch = useAppDispatch();

  let index = 0;

  const getSprintWords = (group: string, page: string) => {
    dispatch(fetchWordsForGame({ group, page, user: null }));

    if (Number(page) > 0) {
      if (index < 2) {
        index += 1;
        console.log(index);
        const newPage: string = (Number(page) - 1).toString();
        getSprintWords(group, newPage);
      } else {
        // eslint-disable-next-line
        return;
      }
    }
  };

  const getWordsFromMenu = (pageData: PageData) => {
    const { group, page } = pageData;
    if (gameType === 'sprint') {
      getSprintWords(group, page);
    }
  };
  const getWordsFromTextbook = () => {
    console.log('textbook');
  };

  const getWords = (pageData: PageUserData) => {
    const { group, page } = pageData;

    switch (wordsSource) {
      case 'group':
        getWordsFromMenu({ group, page });
        break;
      case 'textbook':
        getWordsFromTextbook();
        break;
      default:
        break;
    }
  };

  return (
    <>
      {
        getWords({
          group: currentPageData.group,
          page: currentPageData.page,
          user: { userId: '', token: '' },
        })
      }
    </>
  );
};

export default WordRecipient;
