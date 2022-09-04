import React, { FC } from 'react';
import { Gauge } from '@ant-design/plots';
import { getPercent } from '../../../utils/helpers/gameHelpers';

export type GameWinPercentProps = {
  rightWords: number;
  wrongWords: number;
}

const GameWinPercent: FC<GameWinPercentProps> = (props) => {
  const { rightWords, wrongWords } = props;
  const percent = getPercent(rightWords, wrongWords);

  return (
    <Gauge
      percent={percent / 100}
      type="meter"
      innerRadius={0.75}
      range={{
        ticks: [0, 1 / 3, 2 / 3, 1],
        color: ['#F4664A', '#FAAD14', '#30BF78'],
      }}
      indicator={{
        pointer: {
          style: {
            stroke: '#D0D0D0',
          },
        },
        pin: {
          style: {
            stroke: '#D0D0D0',
          },
        },
      }}
      statistic={{
        content: {
          style: {
            fontSize: '36px',
            lineHeight: '36px',
          },
        },
      }}
    />
  );
};

export default GameWinPercent;
