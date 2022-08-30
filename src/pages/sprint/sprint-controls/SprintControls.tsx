import React, { FC, useEffect } from 'react';
import { Button } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addRightAnswer,
  addWrongAnswer,
  removeRightAnswer,
  setMultiplier,
  setRoundIndex,
} from '../../../store/slices/sprintGame';
import { checkAnswer } from '../../../utils/helpers/gameHelpers';

import './sprint-controls.scss';

const SprintControls: FC = () => {
  const {
    currentWord,
    roundIndex,
    rightAnswers,
    wrongAnswers,
    multiplier,
  } = useAppSelector((state) => state.sprintGame);
  const { words } = useAppSelector((state) => state.currentGame);
  const dispatch = useAppDispatch();

  const chooseAnswer = (answer: boolean) => {
    const word = words.find((findWord) => findWord.id === currentWord.id);
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

      if (rightAnswers.indexOf(word!) !== -1) {
        dispatch(removeRightAnswer(word!));
      }
    }

    if (roundIndex <= words.length - 1) {
      const index = roundIndex + 1;
      dispatch(setRoundIndex(index));
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.code === 'ArrowLeft') {
      chooseAnswer(false);
    } else if (e.code === 'ArrowRight') {
      chooseAnswer(true);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="sprint__controls controls">
      <Button
        type="primary"
        onClick={() => chooseAnswer(false)}
      >
        Неверно
      </Button>
      <Button
        type="primary"
        onClick={() => chooseAnswer(true)}
      >
        Верно
      </Button>
    </div>
  );
};

export default SprintControls;
