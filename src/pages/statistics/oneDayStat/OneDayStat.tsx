import React, { FC } from 'react';
import {
  Carousel
} from 'antd';
import WordsStatistics from '../wordsStatistic/WordsStatistic';
import GameStatistic from '../gameStatistic';

const OneDayStat: FC = () => (
  <>
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

export default OneDayStat;
