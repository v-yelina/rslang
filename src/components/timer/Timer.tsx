import React, { FC, useEffect, useState } from 'react';
import { Typography } from 'antd';
import './timer.scss';

const padNum = (num: number): string => (`${num > 9 ? '' : '0'}${num}`);

const decreaseOrStopTimer = (timerID: number) => (time: number): number => {
  if (time > 0) return time - 1;
  window.clearInterval(timerID);
  return 0;
};

const Timer: FC = () => {
  const [time, setTime] = useState(60);

  useEffect(() => {
    const interval = window.setInterval(
      () => setTime(decreaseOrStopTimer(time)),
      1000,
    );
    return () => window.clearInterval(interval);
  }, [time]);

  return (
    <div className="timer">
      <div className="timer__icon" />
      <Typography.Text className="timer__time">{padNum(time)}</Typography.Text>
    </div>
  );
};

export default Timer;
