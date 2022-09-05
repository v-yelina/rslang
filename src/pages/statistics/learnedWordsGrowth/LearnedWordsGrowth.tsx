import React, { FC } from 'react';
import { TinyArea } from '@ant-design/plots';

type LearnedWordsGrowthType = {
  data: number[];
}

const LearnedWordsGrowth: FC<LearnedWordsGrowthType> = (props) => {
  const { data } = props;

  const growthData = data.map((_el, ind) => data.slice(0, ind + 1).reduce((a, b) => a + b, 0));

  return (
    <TinyArea
      height={100}
      autoFit
      data={growthData}
      smooth
      color="#a9def9"
      className="chart-item"
    />
  );
};

export default LearnedWordsGrowth;
