import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button, Spin } from 'antd';

import { getRandomIndex } from '../../utils/helpers/gameHelpers';
import { WORDS_GROUPS, WORDS_PER_PAGE } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { PageData } from '../../store/types';
import { fetchRandomWordsForGame, fetchWordsForGame } from '../../store/thunks';
import { setWordsToTrain } from '../../store/slices/currentGame';

import './level-select.scss';

const { Title, Text } = Typography;
const NUMBER_WORD_GENERATION_STEPS = 3;
const LAST_PAGE = 29;

const LevelSelect: FC = () => {
  const {
    gameType, wordsSource, words, fulfilledCount, pendingCount,
  } = useAppSelector(
    (state) => state.currentGame,
  );
  const { currentPageData } = useAppSelector((state) => state.textbook);
  const { isLogged, user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isReadyToFetchWords, setIsReadyToFetchWords] = useState(false);
  const [thisPageData, setThisPageData] = useState<PageData>({ group: '', page: '' });
  const [isSHow, setIsShow] = useState(false);

  const getWordsFromMenu = (pageData: PageData) => {
    const { group, page } = pageData;

    dispatch(fetchWordsForGame({ group, page, user: isLogged ? user : null }));
    let index = 0;
    let currentPage = page;

    while (index < NUMBER_WORD_GENERATION_STEPS) {
      if (Number(currentPage) <= 0) {
        currentPage = LAST_PAGE.toString();
      }
      const newPage: string = (Number(currentPage) - 1).toString();
      dispatch(fetchWordsForGame({ group, page: newPage, user: isLogged ? user : null }));
      currentPage = newPage;
      index += 1;
    }
  };

  const clickHandler = (group: number) => {
    const randomPage = getRandomIndex(30).toString();
    const currentGroup = (group - 1).toString();
    dispatch(fetchRandomWordsForGame({ group: currentGroup, page: randomPage, user: null }));
    getWordsFromMenu({ group: currentGroup, page: randomPage });
  };

  useEffect(() => {
    const { group, page } = currentPageData;

    switch (wordsSource) {
      case 'group':
        setIsShow(true);
        break;
      case 'textbook':
        setThisPageData({ group, page });
        dispatch(fetchRandomWordsForGame({ group, page, user: isLogged ? user : null }));
        setIsShow(false);
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    const { group, page } = thisPageData;
    if (wordsSource === 'textbook' && page >= '0' && words.length < WORDS_PER_PAGE) {
      dispatch(fetchWordsForGame({ group, page, user: isLogged ? user : null }));
      if (Number(page) > 0) {
        const newPage: string = (Number(page) - 1).toString();
        setThisPageData({ group, page: newPage });
      } else {
        setIsReadyToFetchWords(true);
      }
    } else {
      setIsReadyToFetchWords(true);
    }
  }, [thisPageData]);

  useEffect(() => {
    if (wordsSource === 'textbook' && isReadyToFetchWords && pendingCount === fulfilledCount) {
      if (words.length > WORDS_PER_PAGE) {
        const arr = [];
        for (let i = 0; i <= WORDS_PER_PAGE - 1; i += 1) {
          arr.push(words[i]);
        }
        dispatch(setWordsToTrain(arr));
      }
      navigate(`${gameType}`, { replace: true });
    }
  }, [fulfilledCount]);

  useEffect(() => {
    if (fulfilledCount > NUMBER_WORD_GENERATION_STEPS + 1 && wordsSource === 'group') {
      navigate(`${gameType}`, { replace: true });
    }
  }, [fulfilledCount]);

  return (
    <div className="level">
      {isSHow && (
        <div className="level-select">
          <Title level={2}>{gameType?.toUpperCase()}</Title>
          <Text>Select the Level</Text>
          <div className="level-select__list">
            {WORDS_GROUPS.map((numberGroup) => (
              <Button
                id={`level-${numberGroup}`}
                type="primary"
                onClick={() => clickHandler(numberGroup)}
                shape="circle"
                size="large"
                key={numberGroup.toString()}
              >
                {numberGroup}
              </Button>
            ))}
          </div>
        </div>
      )}
      {
        (pendingCount > fulfilledCount) && (
          <Spin
            size="large"
            tip="Loading..."
          />
        )
      }
    </div>
  );
};

export default LevelSelect;
