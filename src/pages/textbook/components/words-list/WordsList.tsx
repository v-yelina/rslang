import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { fetchWordsByGroupAndPage } from '../../../../store/thunks';
import WordCard from '../word-card';

import './words-list.scss';

const WordsList: FC = () => {
  const dispatch = useAppDispatch();
  const {
    isLoading, currentWords, currentGroup, currentPage,
  } = useAppSelector(
    (state) => state.textbook,
  );

  useEffect(() => {
    dispatch(
      fetchWordsByGroupAndPage({ group: currentGroup.toString(), page: currentPage.toString() }),
    );
  }, [currentGroup, currentPage]);

  return (
    <div className="words-list-container">
      {isLoading && <h3>Loading words...</h3>}
      {!!currentWords.length && (
        <div className="words-list">
          {currentWords.map((word) => (
            <WordCard key={word.id} wordData={word} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WordsList;
