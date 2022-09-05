import React, {
  Dispatch, FC, SetStateAction, useEffect,
} from 'react';
import { Typography } from 'antd';
import './timer.scss';

type TimerProps = {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

const padNum = (num: number): string => (`${num > 9 ? '' : '0'}${num}`);

const decreaseOrStopTimer = (timerID: number) => (time: number): number => {
  if (time > 0) return time - 1;
  window.clearInterval(timerID);
  return 0;
};

const Timer: FC<TimerProps> = (props) => {
  const { time, setTime } = props;

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
