import React, { FC } from 'react';
import { Divider, Space } from 'antd';
import WordsPerDay from '../wordsPerDay';
import Item from 'antd/lib/descriptions/Item';

const AllTimeStat: FC = () => (
  <Space>
    <Divider>New words per day:</Divider>
    <Item>
      <WordsPerDay />
    </Item>

  </Space>
);

export default AllTimeStat;
