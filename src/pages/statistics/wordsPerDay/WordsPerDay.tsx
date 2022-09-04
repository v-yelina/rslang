import React, { FC } from 'react';
import { Column } from '@ant-design/plots';

export type WordsPerDayProps = {
  data: {
    date: string;
    words: number;
  }[]
}

const WordsPerDay: FC<WordsPerDayProps> = (props) => {
  const { data } = props;

  return (
    <Column
      height={60}
      autoFit={false}
      data={data}
      yField="words"
      xField="date"
    />
  );
};

export default WordsPerDay;
