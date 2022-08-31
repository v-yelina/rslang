import React, { FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearSprintState, setCurrentWord } from '../../store/slices/sprintGame';
import ResultGame from '../../components/result-game';
import SprintGameContainer from './sprint-game-container';
import { DURATION_GAME_SPRINT } from '../../constants';
import { Answer } from '../../store/types';
import { getRandomTranslate } from './sprintGame';

import './sprint.scss';

const Sprint: FC = () => {
  const dispatch = useAppDispatch();
  const {
    roundIndex,
    rightAnswers,
    wrongAnswers,
  } = useAppSelector((state) => state.sprintGame);
  const {
    words,
    randomWords,
  } = useAppSelector((state) => state.currentGame);

  const [isGameFinished, setGameFinished] = useState(false);
  const [gameTime, setGameTime] = useState(DURATION_GAME_SPRINT);

  useEffect(() => {
    if (gameTime <= 0 || roundIndex >= words.length) {
      setGameFinished(true);
    }
  }, [gameTime, roundIndex]);

  useEffect(() => {
    if (roundIndex < words.length) {
      dispatch(setCurrentWord(getRandomTranslate(words[roundIndex], randomWords)));
    }
  }, [roundIndex]);

  useEffect(() => function clearState() {
    dispatch(clearSprintState());
  }, []);

  return (
    <section className="sprint">
      {
        !isGameFinished
          ? <SprintGameContainer time={gameTime} setTime={setGameTime} />
          : (
            <ResultGame
              rightWords={rightAnswers}
              wrongWords={wrongAnswers as unknown as Answer[]}
            />
          )
      }
    </section>
  );
};

export default Sprint;
