import React, { FC, useEffect, useState } from 'react';
import { Typography, Progress } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setGameScore } from '../../../store/slices/sprintGame';
import { NUMBER_OF_ANSWERS_TO_INCREASE } from '../../../constants';

import './sprint-multiplier.scss';

const SprintMultiplier: FC = () => {
  const dispatch = useAppDispatch();
  const {
    score, counter, multiplier, roundIndex, isRightAnswer,
  } = useAppSelector((state) => state.sprintGame);

  const [countPerWord, setCountPerWord] = useState(0);
  const [percent, setPercent] = useState(0);
  const [color, setColor] = useState(0);

  useEffect(() => {
    const currentCount = multiplier > 0 ? multiplier * 20 : 10;

    if (counter === 0) {
      setPercent(0);
    } else {
      const progressPercent = counter % NUMBER_OF_ANSWERS_TO_INCREASE === 0
        ? 1
        : (counter / NUMBER_OF_ANSWERS_TO_INCREASE) % 1;
      setPercent(progressPercent * 100);
    }

    setCountPerWord(currentCount);
    setColor(multiplier);

    if (isRightAnswer) {
      const newGameScore = score + currentCount;
      dispatch(setGameScore(newGameScore));
    }
  }, [roundIndex]);

  return (
    <div className="sprint__multiplier multiplier">
      <Typography.Text className="multiplier__text">
        {`+${countPerWord} points per word`}
      </Typography.Text>
      <Progress
        steps={4}
        percent={percent}
        showInfo={false}
        type="line"
        strokeWidth={14}
        className={`multiplier__progress--${color}`}
      />
    </div>
  );
};

export default SprintMultiplier;
