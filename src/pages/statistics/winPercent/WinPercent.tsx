import React, { FC } from 'react';
import { Liquid } from '@ant-design/plots';
import { GameWinPercentProps } from '../gameWinPercent/GameWinPercent';
import { getPercent } from '../../../utils/helpers/gameHelpers';

const WinPercent: FC<GameWinPercentProps> = (props) => {
  const { rightWords, wrongWords } = props;
  const percent = getPercent(rightWords, wrongWords) / 100;
  return (
    <Liquid
      percent={percent}
      outline={{
        border: 2,
        distance: 4,
      }}
      wave={{
        length: 128,
      }}
      width={300}
      height={300}
    />
  );
};

export default WinPercent;
