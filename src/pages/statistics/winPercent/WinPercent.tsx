import React, { FC } from 'react';
import { Liquid } from '@ant-design/plots';

const WinPercent: FC = () => (
  <Liquid
    percent={0.25}
    outline={{
      border: 4,
      distance: 8,
    }}
    wave={{
      length: 128,
    }}
  />
);

export default WinPercent;
