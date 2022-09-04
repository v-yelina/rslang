import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  addRightAnswer,
  addWrongAnswer,
  removeRightAnswer,
  setCounter,
  setIsRightAnswer,
  setMultiplier,
  setRoundIndex,
} from '../../../store/slices/sprintGame';
import { checkAnswer } from '../../../utils/helpers/gameHelpers';
import rightAnswerSound from '../../../assets/sounds/right-answer.mp3';
import wrongAnswerSound from '../../../assets/sounds/wrong-answer.mp3';

import './sprint-controls.scss';
import { changeCombo } from '../../../store/slices/currentGame';

const SprintControls: FC = () => {
  const {
    currentWord,
    roundIndex,
    rightAnswers,
    wrongAnswers,
    counter,
    multiplier,
  } = useAppSelector((state) => state.sprintGame);
  const { words, maxCombo } = useAppSelector((state) => state.currentGame);
  const dispatch = useAppDispatch();
  const [currentCount, setCurrentCount] = useState(1);
  const [combo, setCombo] = useState(0);
  const rightAnswerAudio = new Audio(rightAnswerSound);
  const wrongAnswerAudio = new Audio(wrongAnswerSound);

  const chooseAnswer = (answer: boolean) => {
    const word = words.find((findWord) => findWord.id === currentWord.id);
    const correctAnswer = checkAnswer(word!.wordTranslate, currentWord.wordTranslate);

    if (answer === correctAnswer) {
      if (wrongAnswers.indexOf(word!) === -1 && rightAnswers.indexOf(word!) === -1) {
        dispatch(addRightAnswer(word!));
        if (counter < 4) {
          setCurrentCount(currentCount + 1);
          dispatch(setCounter(currentCount));
        } else if (multiplier < 4) {
          setCurrentCount(1);
          dispatch(setCounter(0));
          dispatch(setMultiplier(multiplier + 1));
        }
      }
      setCombo(combo + 1);
      rightAnswerAudio.play();
      dispatch(setIsRightAnswer(true));
    } else if (wrongAnswers.indexOf(word!) === -1) {
      dispatch(addWrongAnswer(word!));
      dispatch(setCounter(0));
      dispatch(setMultiplier(0));
      dispatch(setIsRightAnswer(false));
      setCurrentCount(1);

      if (combo > maxCombo) {
        dispatch(changeCombo(combo));
      }
      setCombo(0);

      if (rightAnswers.indexOf(word!) !== -1) {
        dispatch(removeRightAnswer(word!));
      }
      wrongAnswerAudio.play();
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
