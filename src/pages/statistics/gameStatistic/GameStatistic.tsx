import React, { FC } from 'react';
import {
  Space, Typography, List, Divider, Progress,
} from 'antd';

type GameStatisticsProps = {
  gameName: string
}

const GameStatistics: FC<GameStatisticsProps> = (props) => {
  const { Text } = Typography;
  const { Item } = List;
  const { gameName } = props;

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    background: '#e7c6ff',
    width: '60%',
    margin: '0 auto',
    height: 'max-content',
  };

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
        <Progress type="circle" percent={60} />
      </Item>
    </Space>
  );
};

export default GameStatistics;
