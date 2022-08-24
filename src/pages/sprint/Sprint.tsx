import React, { FC, useEffect, useState } from 'react';
import { Spin } from 'antd';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearSprintState, setCurrentWord, setRoundDuration } from '../../store/slices/sprintGame';
import { fetchWordsToSprintGame } from '../../store/thunks';
import ResultGameModal from '../../components/shared/modal/result-game-modal';
import SprintGameContainer from './sprint-game-container';
import getWordsToTrain from './sprintGame';
import { DURATION_GAME_SPRINT } from '../../constants';
import { clearCurrentGame } from '../../store/slices/currentGame';
import { Answer } from '../../store/types';

import './sprint.scss';

const Sprint: FC = () => {
  const dispatch = useAppDispatch();
  const {
    words,
    roundIndex,
    rightAnswers,
    wrongAnswers,
    isLoading,
    currentWord,
  } = useAppSelector((state) => state.sprintGame);

  const [isGameFinished, setGameFinished] = useState(false);
  const [gameTime, setGameTime] = useState(DURATION_GAME_SPRINT);
  const [gameWords, setGameWords] = useState([currentWord]);

  const clearGame = () => {
    dispatch(clearSprintState());
    dispatch(clearCurrentGame());
  };

  useEffect(() => {
    dispatch(fetchWordsToSprintGame());

    return function resetCurrentGame() {
      clearGame();
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setGameWords(getWordsToTrain(words));
      dispatch(setCurrentWord(gameWords[roundIndex]));
      dispatch(setRoundDuration(gameWords.length));
    }
  }, [words]);

  useEffect(() => {
    if (!isLoading) {
      if (gameTime <= 0) {
        setGameFinished(true);
      }
    }
  }, [gameTime, isLoading]);

  useEffect(() => {
    if (roundIndex < gameWords.length) {
      dispatch(setCurrentWord(gameWords[roundIndex]));
    }
    if (roundIndex === gameWords.length - 2) {
      const newWords = [
        ...gameWords,
        ...getWordsToTrain(words),
      ];
      setGameWords(newWords);
    }
    dispatch(setRoundDuration(gameWords.length));
  }, [roundIndex]);

  return (
    <section className="sprint">
      {
        (() => {
          if (isLoading) {
            return <Spin size="large" />;
          }
          return (
            !isGameFinished
              ? <SprintGameContainer time={gameTime} setTime={setGameTime} />
              : (
                <ResultGameModal
                  rightWords={rightAnswers}
                  wrongWords={wrongAnswers as unknown as Answer[]}
                  clickHandler={clearGame}
                />
              )
          );
        })()
      }
    </section>
  );
};

export default Sprint;
