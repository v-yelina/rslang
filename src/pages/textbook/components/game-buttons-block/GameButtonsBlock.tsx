import React, { FC } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { selectIsPageLearned } from '../../../../store/slices/textbook';
import GameButton from '../game-button/GameButton';
import LearnedBadge from '../learned-bage';

import './game-buttons-block.scss';

const GameButtonsBlock: FC = () => {
  const isPageLearned = useAppSelector(selectIsPageLearned);
  const { isLoading } = useAppSelector((state) => state.textbook);
  return (
    <div className="game-buttons-wrapper">
      {!isLoading && isPageLearned && <LearnedBadge />}
      <GameButton game="sprint" />
      <GameButton game="audiochallenge" />
    </div>
  );
};

export default GameButtonsBlock;
