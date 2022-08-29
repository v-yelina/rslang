import React, { FC } from 'react';
import {
  Carousel,
} from 'antd';
import GameStatistic from './gameStatistic';

const Statistics: FC = () => (
  <>
    <h2>Statistics</h2>
    <Carousel>
      <div>
        <GameStatistic gameName="Audiochallenge" />
      </div>
      <div>
        <GameStatistic gameName="Sprint" />
      </div>
    </Carousel>

  </>
);

export default Statistics;
