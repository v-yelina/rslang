import React, { FC } from 'react';
import { Typography } from 'antd';

import { useAppSelector } from '../../../store/hooks';

import './counter.scss';

const Counter: FC = () => {
  const { score } = useAppSelector((state) => state.sprintGame);

  return (
    <div className="sprint__counter counter">
      <Typography.Title
        level={3}
      >
        {score}
      </Typography.Title>
    </div>
  );
};

export default Counter;
