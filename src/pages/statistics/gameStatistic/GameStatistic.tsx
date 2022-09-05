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
    width: '60%',
    margin: '0 auto',
    height: 'max-content',
  };

  return (
    <Space style={contentStyle} className="game-tab">
      <Divider className="game-name">{gameName}</Divider>
      <List>
        <Item>
          <Text strong>Played games:&nbsp;</Text>
          <Text>
            {statistic.gamesPlayed}
          </Text>
        </Item>
        <Item>
          <Text strong>New words:&nbsp;</Text>
          <Text>
            {statistic.newWords}
          </Text>
        </Item>
        <Item>
          <Text strong>Longest combo:&nbsp;</Text>
          <Text>
            {statistic.longestCombo}
          </Text>
        </Item>
        <Item>
          <Text strong>Correct answers:&nbsp;</Text>
          <GameWinPercent
            rightWords={statistic.correctAnswers}
            wrongWords={statistic.wrongAnswers}
          />
        </Item>
      </List>
    </Space>
  );
};

export default GameStatistics;
