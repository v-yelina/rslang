import React, { FC } from 'react';
import {
  Carousel,
} from 'antd';
import WordsStatistics from '../wordsStatistic/WordsStatistic';
import GameStatistic from '../gameStatistic';
import { Content } from 'antd/lib/layout/layout';

const OneDayStat: FC = () => (
  <Content id='one-day-stat-tab'>
    <WordsStatistics />
    <Carousel className='game-statistic' dots>
      <div>
        <GameStatistic gameName="Audiochallenge" />
      </div>
      <div>
        <GameStatistic gameName="Sprint" />
      </div>
    </Carousel>
  </Content>
);

export default OneDayStat;
