import React, { FC } from 'react';
import {
  Space, Typography, List, Divider,
} from 'antd';
import GameWinPercent from '../gameWinPercent';
import { useAppSelector } from '../../../store/hooks';

type GameStatisticsProps = {
  gameName: string
}

const GameStatistics: FC<GameStatisticsProps> = (props) => {
  const { Text } = Typography;
  const { Item } = List;
  const { gameName } = props;
  const statistic = useAppSelector((state) => (gameName === 'Audiochallenge' ? state.statistic.statistic.optional.audiochallenge : state.statistic.statistic.optional.sprint));

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: '#caf0f8',
    width: '60%',
    margin: '0 auto',
    height: 'max-content',
  };

  return (
    <Space style={contentStyle}>
      <Divider>{gameName}</Divider>
      <Item>
        <Text strong>Played games: </Text>
        <Text>
          {' '}
          {statistic.gamesPlayed}
        </Text>
      </Item>
      <Item>
        <Text strong>New words: </Text>
        <Text>
          {' '}
          {statistic.newWords}
        </Text>
      </Item>
      <Item>
        <Text strong>Longest combo: </Text>
        <Text>
          {' '}
          {statistic.longestCombo}
        </Text>
      </Item>
      <Item>
        <GameWinPercent rightWords={statistic.correctAnswers} wrongWords={statistic.wrongAnswers} />
      </Item>
    </Space>
  );
};

export default GameStatistics;
