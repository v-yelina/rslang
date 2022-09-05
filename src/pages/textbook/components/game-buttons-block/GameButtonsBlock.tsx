import React, { FC } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { selectIsPageLearned } from '../../../../store/slices/textbook';
import GameButton from '../game-button/GameButton';
import LearnedBadge from '../learned-bage';

import './game-buttons-block.scss';

const GameButtonsBlock: FC = () => {
  const isPageLearned = useAppSelector(selectIsPageLearned);
  return (
    <div className="game-buttons-wrapper">
      {isPageLearned && <LearnedBadge />}
      <GameButton game="sprint" />
      <GameButton game="audiochallenge" />
    </div>
  );
};

export default GameButtonsBlock;
