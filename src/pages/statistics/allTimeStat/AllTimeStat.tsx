import React, { FC } from 'react';
import { Divider, Space } from 'antd';
import Item from 'antd/lib/descriptions/Item';
import WordsPerDay from '../wordsPerDay';
import LearnedWordsGrowth from '../learnedWordsGrowth/LearnedWordsGrowth';

const AllTimeStat: FC = () => (
  <Space>
    <Divider>New words per day:</Divider>
    <Item>
      <WordsPerDay />
    </Item>
    <Divider>Learned words growth:</Divider>
    <Item>
      <LearnedWordsGrowth />
    </Item>
  </Space>
);

export default AllTimeStat;
