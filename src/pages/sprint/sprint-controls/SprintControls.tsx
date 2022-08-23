import React, { FC } from 'react';
import { Button } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addRightAnswer,
  addWrongAnswer,
  setMultiplier,
  setRoundIndex,
} from '../../../store/slices/sprintGame/sprintGameSlice';
import { checkAnswer } from '../../../utils/gameUtils';

import './sprint-controls.scss';

const SprintControls: FC = () => {
  const {
    currentWord,
    roundIndex,
    rightAnswers,
    wrongAnswers,
    words,
    roundDuration,
    multiplier,
  } = useAppSelector((state) => state.sprintGame);
  const dispatch = useAppDispatch();

  const handleClick = (answer: boolean) => {
    const word = words.find((findWord) => findWord.word === currentWord.word);
    const correctAnswer = checkAnswer(word!.wordTranslate, currentWord.wordTranslate);

    if (answer === correctAnswer) {
      if (wrongAnswers.indexOf(word!) === -1 && rightAnswers.indexOf(word!) === -1) {
        dispatch(addRightAnswer(word!));
        if (multiplier < 4) {
          const m = multiplier + 1;
          dispatch(setMultiplier(m));
        }
      }
    } else if (wrongAnswers.indexOf(word!) === -1) {
      dispatch(addWrongAnswer(word!));
      dispatch(setMultiplier(0));
    }

    if (roundIndex <= roundDuration) {
      const index = roundIndex + 1;
      dispatch(setRoundIndex(index));
    }
  };

  return (
    <div className="sprint__controls controls">
      <Button
        type="primary"
        onClick={() => handleClick(false)}
      >
        Неверно
      </Button>
      <Button
        type="primary"
        onClick={() => handleClick(true)}
      >
        Верно
      </Button>
    </div>
  );
};

export default SprintControls;
