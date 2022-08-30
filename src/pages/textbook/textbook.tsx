import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchDifficultWordsForTextbook, fetchWordsForTextbook } from '../../store/thunks';
import {
  clearCurrentWords,
  setCurrentPageData,
  selectCurrentPageData,
} from '../../store/slices/textbook';
import { selectIsLogged, selectUser } from '../../store/slices/auth';
import { checkSearchParamsCorrect, formatPageDataForSlice } from './helpers';
import {
  TEXTBOOK_PARAMS,
  SEARCH_INITIAL_GROUP,
  SEARCH_INITIAL_PAGE,
  DIFFICULT_GROUP_SLICE_NUM,
  DIFFICULT_GROUP_UI_NUM,
} from '../../constants';

import GroupsTabs from './components/groups-tabs';
import WordsList from './components/words-list';
import GameButtonsBlock from './components/game-buttons-block';

import './textbook.scss';

const Textbook: FC = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const currentPageData = useAppSelector(selectCurrentPageData);
  const isLogged = useAppSelector(selectIsLogged);
  const user = useAppSelector(selectUser);
  const [isReadyToFetchWords, setIsReadyToFetchWords] = useState(false);

  let paramsGroup = params.get(TEXTBOOK_PARAMS.GROUP);
  let paramsPage = params.get(TEXTBOOK_PARAMS.PAGE);

  const setPageDataFromParams = () => {
    const isSearchParamsCorrect = checkSearchParamsCorrect(paramsGroup, paramsPage)
      || (isLogged && paramsGroup === DIFFICULT_GROUP_UI_NUM);

    if (paramsGroup === DIFFICULT_GROUP_UI_NUM) {
      setParams({ group: paramsGroup, page: SEARCH_INITIAL_PAGE });
    }

    if (!isSearchParamsCorrect) {
      paramsGroup = SEARCH_INITIAL_GROUP;
      paramsPage = SEARCH_INITIAL_PAGE;
      setParams({ group: paramsGroup, page: paramsPage });
    }
    const newPageData = {
      group: formatPageDataForSlice(paramsGroup as string),
      page: formatPageDataForSlice(paramsPage as string),
    };
    dispatch(setCurrentPageData(newPageData));
  };

  useEffect(() => {
    dispatch(setCurrentPageData({ group: '', page: '' }));
    setPageDataFromParams();
    setIsReadyToFetchWords(true);
    return function resetCurrentWords() {
      dispatch(clearCurrentWords());
    };
  }, []);

  useEffect(() => {
    const { group, page } = currentPageData;
    if (isReadyToFetchWords && group.length && page.length) {
      if (group === DIFFICULT_GROUP_SLICE_NUM) {
        dispatch(fetchDifficultWordsForTextbook({ userId: user.userId, token: user.token }));
      } else {
        dispatch(
          fetchWordsForTextbook({
            group,
            page,
            user: isLogged ? { userId: user.userId, token: user.token } : null,
          }),
        );
      }
    }
  }, [currentPageData, isReadyToFetchWords]);

  return (
    <main className="textbook-container">
      <h2>Textbook Page</h2>
      {isReadyToFetchWords && <GameButtonsBlock />}
      {isReadyToFetchWords && <GroupsTabs />}
      {isReadyToFetchWords && <WordsList />}
    </main>
  );
};

export default Textbook;
