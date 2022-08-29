import React, { FC } from 'react';
import {
  Carousel,
} from 'antd';
import GameStatistic from './gameStatistic';
import WordsStatistics from './wordsStatistic/WordsStatistic';

const Statistics: FC = () => (
  <>
    <h2>Statistics</h2>
    <WordsStatistics />
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
