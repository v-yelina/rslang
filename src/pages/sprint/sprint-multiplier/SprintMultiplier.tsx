import React, { FC, useEffect, useState } from 'react';
import { Typography, Progress } from 'antd';
import './sprint-multiplier.scss';

const SprintMultiplier: FC = () => {
  const [count, setCount] = useState(10);
  const [percent, setPercent] = useState(0);
  const [multy, setMulty] = useState(0);

  useEffect(() => {
    const multyCount = multy > 0 ? multy * 20 : 10;
    const multyPercent = 25 * multy;
    setCount(multyCount);
    setPercent(multyPercent);
  }, [multy]);

  const increment = () => {
    if (multy < 4) {
      const m = multy + 1;
      setMulty(m);
    }
  };

  const decrement = () => {
    if (multy > 0) {
      const m = multy - 1;
      setMulty(m);
    }
  };

  // TODO заменить изменение multy на данные из логики
  if (multy > 1) {
    increment();
    decrement();
  }

  return (
    <div className="sprint__multiplier multiplier">
      <Typography.Text className="multiplier__text">
        {`+${count} очков за слово`}
      </Typography.Text>
      <Progress
        steps={4}
        percent={percent}
        showInfo={false}
        type="line"
        strokeWidth={14}
      />
    </div>
  );
};

export default SprintMultiplier;
