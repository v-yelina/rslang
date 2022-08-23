import React, { FC, useEffect, useState } from 'react';
import { Typography, Progress } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setGameScore } from '../../../store/slices/sprintGame/sprintGameSlice';

import './sprint-multiplier.scss';

const SprintMultiplier: FC = () => {
  const dispatch = useAppDispatch();
  const { score, multiplier, currentWord } = useAppSelector((state) => state.sprintGame);

  const [countPerWord, setCountPerWord] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const currentCount = multiplier > 0 ? multiplier * 20 : 10;
    const progressPercent = 25 * multiplier;

    setCountPerWord(currentCount);
    setPercent(progressPercent);

    const newGameScore = score + currentCount;
    dispatch(setGameScore(newGameScore));
  }, [currentWord]);

  return (
    <div className="sprint__multiplier multiplier">
      <Typography.Text className="multiplier__text">
        {`+${countPerWord} очков за слово`}
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
