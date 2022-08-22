import React, { FC } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import WordCard from '../word-card';

import './words-list.scss';

const WordsList: FC = () => {
  const { isLoading, currentWords } = useAppSelector((state) => state.textbook);

  return (
    <div className="words-list-container">
      {isLoading && <h3>Loading words...</h3>}
      {!isLoading && !!currentWords.length && (
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
