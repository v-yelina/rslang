import React, { FC } from 'react';
import {
  Carousel,
} from 'antd';
import { Content } from 'antd/lib/layout/layout';
import WordsStatistics from '../wordsStatistic/WordsStatistic';
import GameStatistic from '../gameStatistic';

const OneDayStat: FC = () => {
  const imageUrl = 'https://img.freepik.com/free-vector/couple-professionals-analyzing-graphs_74855-4393.jpg?w=1060&t=st=1662325261~exp=1662325861~hmac=5114277824d02880a92c22348a09f54490283fa78642550ba9e9da023724e2f6';

  return (
    <Content id="one-day-stat-tab" style={{ backgroundImage: `url(${imageUrl})` }}>
      <WordsStatistics />
      <Carousel className="game-statistic" dots>
        <div>
          <GameStatistic gameName="Audiochallenge" />
        </div>
        <div>
          <GameStatistic gameName="Sprint" />
        </div>
      </Carousel>
    </Content>
  );
};

export default OneDayStat;
