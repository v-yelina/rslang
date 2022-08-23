import React, { FC } from 'react';
import { GAME_TYPE } from '../../../../constants';
import GameButton from '../game-button/GameButton';

import './game-buttons-block.scss';

const GameButtonsBlock: FC = () => (
  <div className="game-buttons-wrapper">
    <GameButton game="sprint" key={GAME_TYPE.SPRINT} />
    <GameButton game="audiochallenge" key={GAME_TYPE.AUDIOCHALLENGE} />
  </div>
);

export default GameButtonsBlock;
