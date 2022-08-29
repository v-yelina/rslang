import React, { FC } from 'react';
import { TinyArea } from '@ant-design/plots';

const LearnedWordsGrowth: FC = () => {
  const data = [
    192, 264, 340, 438, 546, 887, 983,
  ];

  return (
    <TinyArea
      height={60}
      autoFit={false}
      data={data}
      smooth
      color="#a9def9"
    />
  );
};

export default LearnedWordsGrowth;
