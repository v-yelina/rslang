import React, { FC } from 'react';
import {
  Space, Typography, List, Divider,
} from 'antd';
import WinPercent from '../winPercent';
import { useAppSelector } from '../../../store/hooks';

const WordsStatistics: FC = () => {
  const { Text } = Typography;
  const { Item } = List;
  const { statistic } = useAppSelector((state) => (state.statistic));
  const rightWordsCount = statistic.optional.audiochallenge.correctAnswers
    + statistic.optional.sprint.correctAnswers;
  const wrongWordsCount = statistic.optional.audiochallenge.wrongAnswers
    + statistic.optional.sprint.wrongAnswers;

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    width: '60%',
    margin: '0 auto',
  };

  return (
    <Space style={contentStyle}>
      <Divider>Today learned:</Divider>
      <List>
        <Item>
          <Text strong>New words: </Text>
          <Text>
            {
            statistic.optional.audiochallenge.newWords
            + statistic.optional.sprint.newWords
          }
          </Text>
        </Item>
        <Item>
          <Text strong>Learned words: </Text>
          <Text>{statistic.learnedWords}</Text>
        </Item>
        <Item>
          <Text strong>Played games: </Text>
          <Text>
            {
            statistic.optional.audiochallenge.gamesPlayed
            + statistic.optional.sprint.gamesPlayed
          }
          </Text>
        </Item>
      </List>
      <Item>
        <WinPercent rightWords={rightWordsCount} wrongWords={wrongWordsCount} />
      </Item>
    </Space>
  );
};

export default WordsStatistics;
