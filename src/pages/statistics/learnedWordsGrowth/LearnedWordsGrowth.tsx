import React, { FC } from 'react';
import { TinyArea } from '@ant-design/plots';

type LearnedWordsGrowthType = {
  data: number[];
}

const LearnedWordsGrowth: FC<LearnedWordsGrowthType> = (props) => {
  const { data } = props;

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
