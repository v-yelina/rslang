import React, { FC, useEffect, useState } from 'react';
import { Typography, Progress } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setGameScore } from '../../../store/slices/sprintGame';
import { NUMBER_OF_ANSWERS_TO_INCREASE } from '../../../constants';

import './sprint-multiplier.scss';

const SprintMultiplier: FC = () => {
  const dispatch = useAppDispatch();
  const { score, counter: multiplier, roundIndex } = useAppSelector((state) => state.sprintGame);

  const [countPerWord, setCountPerWord] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const currentCount = multiplier > 0 ? multiplier * 20 : 10;

    if (multiplier === 0) {
      setPercent(0);
    } else {
      const progressPercent = multiplier % NUMBER_OF_ANSWERS_TO_INCREASE === 0
        ? 100
        : (multiplier / NUMBER_OF_ANSWERS_TO_INCREASE) % 1;
      setPercent(progressPercent * 100);
    }

    setCountPerWord(currentCount);

    const newGameScore = score + currentCount;
    dispatch(setGameScore(newGameScore));
  }, [roundIndex]);

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
