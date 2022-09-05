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
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '40%',
  };

  return (
    <Space style={contentStyle} className='words-statistic'>
      <Divider className='tab-title'>Today learned:</Divider>
      <List>
        <Item>
          <Text strong>New words:&nbsp;</Text>
          <Text>
            {
              statistic.optional.audiochallenge.newWords
              + statistic.optional.sprint.newWords
            }
          </Text>
        </Item>
        <Item>
          <Text strong>Learned words:&nbsp;</Text>
          <Text>{statistic.learnedWords}</Text>
        </Item>
        <Item>
          <Text strong>Played games:&nbsp;</Text>
          <Text>
            {
              statistic.optional.audiochallenge.gamesPlayed
              + statistic.optional.sprint.gamesPlayed
            }
          </Text>
        </Item>
        <Item>
          <Text strong>Correct answers:&nbsp;</Text>
          <WinPercent rightWords={rightWordsCount} wrongWords={wrongWordsCount} />
        </Item>
      </List>
    </Space>
  );
};

export default WordsStatistics;
