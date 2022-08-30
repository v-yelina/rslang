import React, { FC } from 'react';
import { DIFFICULT_GROUP_SLICE_NUM } from '../../../../constants';
import { useAppSelector } from '../../../../store/hooks';
import { selectCurrentGroup } from '../../../../store/slices/textbook';
import PaginationBlock from '../pagination';
import WordCard from '../word-card';

import './words-list.scss';

const WordsList: FC = () => {
  const { isLoading, currentWords } = useAppSelector((state) => state.textbook);
  const player = new Audio();
  const group = useAppSelector(selectCurrentGroup);

  return (
    <div className="words-list-container">
      {isLoading && <h3>Loading words...</h3>}
      {!isLoading && !!currentWords.length && (
        <>
          <div className="words-list">
            {currentWords.map((word) => (
              <WordCard key={word.id} wordData={word} player={player} />
            ))}
          </div>
          {group !== DIFFICULT_GROUP_SLICE_NUM && <PaginationBlock />}
        </>
      )}
    </div>
  );
};

export default WordsList;
