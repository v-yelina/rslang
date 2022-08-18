import React, { FC } from 'react';
import { Typography, Progress } from 'antd';
import './sprint-multiplier.scss';

const SprintMultiplier: FC = () => {
  const mult = 20;
  return (
    <div className="sprint__multiplier multiplier">
      <Typography.Text className="multiplier__text">
        {`+${mult} очков за слово`}
      </Typography.Text>
      <Progress
        steps={4}
        percent={50}
        showInfo={false}
        type="line"
        strokeWidth={14}
      />
    </div>
  );
};

export default SprintMultiplier;
