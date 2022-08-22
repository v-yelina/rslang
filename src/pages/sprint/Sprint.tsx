import React, { FC, useEffect, useState } from 'react';
import ResultGameModal from '../../components/shared/modal/result-game-modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import fetchWordsToSprintGame from '../../store/slices/sprintGame/thunks';
import SprintGameContainer from './sprint-game-container';
import getWordsToTrain from './sprintGame';
import './sprint.scss';

const Sprint: FC = () => {
  const dispatch = useAppDispatch();
  const { words } = useAppSelector((state) => state.sprintGame);

  const [isGameFinished, setGameFinished] = useState(false);
  const [gameTime, setGameTime] = useState(60);

  useEffect(() => {
    dispatch(fetchWordsToSprintGame());
  }, []);

  useEffect(() => {
    const gameWords = getWordsToTrain(words);
    console.log({ words, gameWords });
  }, []);

  useEffect(() => {
    if (gameTime <= 0) {
      setGameFinished(false);
    }
  }, [gameTime]);

  return (
    <section className="sprint">
      {
        !isGameFinished
          ? <SprintGameContainer time={gameTime} setTime={setGameTime} />
          : <ResultGameModal rightWords={[]} wrongWords={[]} />
      }
    </section>
  );
};

export default Sprint;
