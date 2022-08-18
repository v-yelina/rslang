import React, { FC } from 'react';
import { Typography } from 'antd';
import './counter.scss';

type CounterProps = {
  count: number;
}

const Counter: FC<CounterProps> = (props) => {
  const { count } = props;
  return (
    <div className="sprint__counter counter">
      <Typography.Title
        level={3}
      >
        {count}
      </Typography.Title>
    </div>
  );
};

export default Counter;
