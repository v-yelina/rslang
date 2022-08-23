import React, { FC } from 'react';
import GameButton from '../game-button/GameButton';

import './game-buttons-block.scss';

const GameButtonsBlock: FC = () => (
  <div className="game-buttons-wrapper">
    <GameButton game="sprint" />
    <GameButton game="audiochallenge" />
  </div>
);

export default GameButtonsBlock;
