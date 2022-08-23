import React, { FC, useEffect, useState } from 'react';
import ResultGameModal from '../../components/shared/modal/result-game-modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import fetchWordsToSprintGame from '../../store/slices/sprintGame/thunks';
import SprintGameContainer from './sprint-game-container';
import getWordsToTrain from './sprintGame';
import { clearCurrentGame, setCurrentWord, setRoundDuration } from '../../store/slices/sprintGame/sprintGameSlice';
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
  const [gameTime, setGameTime] = useState(60);
  const [gameWords, setGameWords] = useState([currentWord]);

  useEffect(() => {
    dispatch(fetchWordsToSprintGame());
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setGameWords(getWordsToTrain(words));
      dispatch(setCurrentWord(gameWords[roundIndex]));
      dispatch(setRoundDuration(gameWords.length));
    }
  }, [isLoading]);

  useEffect(() => {
    if (gameTime <= 0) {
      setGameFinished(true);
    }
  }, [gameTime]);

  useEffect(() => {
    if (roundIndex < gameWords.length) {
      dispatch(setCurrentWord(gameWords[roundIndex]));
    }
    if (roundIndex === gameWords.length - 2) {
      gameWords.push(...getWordsToTrain(words));
      dispatch(setRoundDuration(gameWords.length));
    }
  }, [roundIndex]);

  return (
    <section className="sprint">
      {
        (() => {
          if (isLoading) {
            return <h2>Loading...</h2>;
          }
          return (
            !isGameFinished
              ? <SprintGameContainer time={gameTime} setTime={setGameTime} />
              : (
                <ResultGameModal
                  rightWords={rightAnswers}
                  wrongWords={wrongAnswers}
                  clearGame={() => dispatch(clearCurrentGame())}
                />
              )
          );
        })()
      }
    </section>
  );
};

export default Sprint;
