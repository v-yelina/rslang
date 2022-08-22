import React, { FC, useEffect, useState } from 'react';
import ResultGameModal from '../../components/shared/modal/result-game-modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import fetchWordsToSprintGame from '../../store/slices/sprintGame/thunks';
import SprintGameContainer from './sprint-game-container';
// import getWordsToTrain, { WordsToTrain } from './sprintGame';
// import { setCurrentRoundWord } from '../../store/slices/sprintGame/sprintGameSlice';
import './sprint.scss';

const Sprint: FC = () => {
  const dispatch = useAppDispatch();
  const {
    words, roundIndex, rightAnswers, wrongAnswers,
  } = useAppSelector((state) => state.sprintGame);

  const [isGameFinished, setGameFinished] = useState(false);
  const [gameTime, setGameTime] = useState(60);
  // const [gameWords, setGameWords] =
  // useState<WordsToTrain[]>([{ word: 'test', wordTranslate: 'test' }]);

  useEffect(() => {
    dispatch(fetchWordsToSprintGame());
  }, []);

  useEffect(() => {
    // setGameWords(getWordsToTrain(words));
  }, []);

  // useEffect(() => {
  //   if (gameTime <= 0) {
  //     setGameFinished(false);
  //   } else {
  //     const currentWord: WordsToTrain = gameWords![roundIndex];
  //     dispatch(setCurrentRoundWord(currentWord));
  //   }
  // }, []);
  useEffect(() => {
    if (gameTime <= 0) {
      setGameFinished(false);
    }
    console.log(words, roundIndex);
  }, [gameTime]);

  return (
    <section className="sprint">
      {
        !isGameFinished
          ? <SprintGameContainer time={gameTime} setTime={setGameTime} />
          : <ResultGameModal rightWords={rightAnswers} wrongWords={wrongAnswers} />
      }
    </section>
  );
};

export default Sprint;
