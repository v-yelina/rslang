import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchWordsByGroupAndPage } from '../../store/thunks';
import {
  clearCurrentWords,
  setCurrentPageData,
  selectCurrentPageData,
} from '../../store/slices/textbook';
import {
  checkSearchParamsCorrect,
  formatPageDataForSlice,
  SEARCH_INITIAL_GROUP,
  SEARCH_INITIAL_PAGE,
} from './helpers';
import { TEXTBOOK_PARAMS } from '../../constants';

import GroupsTabs from './components/groups-tabs';
import WordsList from './components/words-list';
import GameButtonsBlock from './components/game-buttons-block';

import './textbook.scss';

const Textbook: FC = () => {
  const [params, setParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const currentPageData = useAppSelector(selectCurrentPageData);
  const [isReadyToFetchWords, setIsReadyToFetchWords] = useState(false);

  let paramsGroup = params.get(TEXTBOOK_PARAMS.GROUP);
  let paramsPage = params.get(TEXTBOOK_PARAMS.PAGE);

  const setPageDataFromParams = () => {
    const isSearchParamsCorrect = checkSearchParamsCorrect(paramsGroup, paramsPage);

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
      dispatch(
        fetchWordsByGroupAndPage({
          group,
          page,
        }),
      );
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
