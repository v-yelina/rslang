import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchWordsByGroupAndPage } from '../../store/thunks';
import WordCard from './components/word-card';

const Textbook: FC = () => {
  const tempPage = '1';
  const tempGroup = '1';
  const dispatch = useAppDispatch();
  const { isLoading, currentWords } = useAppSelector((state) => state.textbook);

  useEffect(() => {
    dispatch(fetchWordsByGroupAndPage({ group: tempGroup, page: tempPage }));
  }, []);

  return (
    <>
      <h2>Textbook Page</h2>
      {isLoading && <h3>Loading words...</h3>}
      {currentWords.length && (
        <div className="words-list">
          {currentWords.map((word) => (
            <WordCard key={word.id} wordData={word} />
          ))}
        </div>
      )}
    </>
  );
};

export default Textbook;
