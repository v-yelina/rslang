import React, { FC } from 'react';
import {
  Space, Typography, List, Divider, Progress,
} from 'antd';
import soud1 from '../../../assets/demo/01_0001.mp3';
import soud2 from '../../../assets/demo/01_0002.mp3';
import soud3 from '../../../assets/demo/01_0003.mp3';

type GameStatisticsProps = {
  gameName: string
}

const GameStatistics: FC<GameStatisticsProps> = (props) => {
  const { Text } = Typography;
  const { Item } = List;
  const { gameName } = props;

  type DemoWord = {
    id: string;
    audio: string;
    word: string;
    wordTranslate: string;
    answer: string;
  };

  const data: DemoWord[] = [
    {
      id: '1',
      audio: soud1,
      word: 'agree',
      wordTranslate: 'соглашаться',
      answer: 'приезжать',
    },
    {
      id: '2',
      audio: soud2,
      word: 'alcohol',
      wordTranslate: 'алкоголь',
      answer: 'копать',
    },
    {
      id: '3',
      audio: soud3,
      word: 'arrive',
      wordTranslate: 'прибыть',
      answer: 'прибыть',
    },
  ];

  const rightWords: DemoWord[] = [];
  const wrongWords: DemoWord[] = [];

  data.filter((item, i) => (
    (i < 2)
      ? wrongWords.push(item)
      : rightWords.push(item)
  ));

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: '#e7c6ff',
    width: '60%',
    margin: '0 auto',
    height: 'max-content',
  };

  const getPercent = (): number => {
    const full: number = rightWords.length + wrongWords.length;
    const result: number = (rightWords.length / full) * 100;

    return Math.floor(result);
  };

  const percent = getPercent();

  return (
    <Space style={contentStyle}>
      <Divider>{gameName}</Divider>
      <Item>
        <Text strong>Played games: </Text>
        <Text> 0</Text>
      </Item>
      <Item>
        <Text strong>New words: </Text>
        <Text> 0</Text>
      </Item>
      <Item>
        <Text strong>Longest combo: </Text>
        <Text> 0</Text>
      </Item>
      <Item>
        <Progress type="circle" percent={percent} />
      </Item>
    </Space>
  );
};

export default GameStatistics;
