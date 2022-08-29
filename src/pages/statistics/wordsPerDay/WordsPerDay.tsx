import React, { FC } from 'react';
import { Column } from '@ant-design/plots';

const WordsPerDay: FC = () => {
  const data = [
    {
      date: '01.02',
      words: 38,
    },
    {
      date: '02.02',
      words: 52,
    },
    {
      date: '03.02',
      words: 61,
    },
    {
      date: '04.02',
      words: 145,
    },
    {
      date: '05.02',
      words: 48,
    },
    {
      date: '06.02',
      words: 38,
    },
    {
      date: '07.02',
      words: 38,
    },
    {
      date: '08.02',
      words: 38,
    },
  ];

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
