import React, {
  FC, MouseEventHandler, useEffect, useState,
} from 'react';
import PlayAudioButton from '../../components/shared/button/play-audio-button';
import OptionsContainer from './optionsContainer';
import './audiochallenge.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  checkAnswer, getAnswerOptions, getAnswerText,
} from './audioChallengeGame';
import ENV from '../../config/config';
import ResultGameModal from '../../components/shared/modal/result-game-modal';
import ConfirmModal from '../../components/shared/modal/confirm-modal';
import LeaveGameButton from '../../components/shared/button/leave-game-button';
import {
  clearCurrentGame,
  addRightAnswer,
  addWrongAnswer,
} from '../../store/slices/currentGame';

const Audiochallenge: FC = () => {
  const dispatch = useAppDispatch();
  const { words, rightAnswers, wrongAnswers } = useAppSelector((state) => state.currentGame);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[wordIndex]);
  const [answerOptions, setAnswerOptions] = useState(getAnswerOptions(currentWord, words));
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isVisibleLeaveModal, setVisibleLeaveModal] = useState(false);
  const wordAudio = `${ENV.BASE_URL}${currentWord.audio}`;

  useEffect(() => {
    setCurrentWord(words[wordIndex]);
  }, [wordIndex]);

  useEffect(() => {
    setAnswerOptions(getAnswerOptions(currentWord, words));
  }, [currentWord]);

  const restartGame = () => {
    dispatch(clearCurrentGame());
    setWordIndex(0);
    setIsGameFinished(false);
  };

  const addAnswersToSlice = (
    isRight: boolean,
    answer: string,
    word: string,
    wordTranslate: string,
    audio: string,
    id: string,
  ) => {
    if (isRight) {
      dispatch(addRightAnswer({
        word, wordTranslate, audio, id,
      }));
    } else {
      dispatch(addWrongAnswer({
        answer, word, wordTranslate, audio, id,
      }));
    }
  };

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    let answer = getAnswerText(e as unknown as MouseEvent);
    if (answer) {
      let isRightAnswer: boolean;
      if (answer === "Don't know") {
        isRightAnswer = false;
        answer = '-';
      } else {
        isRightAnswer = checkAnswer(answer, currentWord.wordTranslate);
      }
      addAnswersToSlice(
        isRightAnswer,
        answer,
        currentWord.word,
        currentWord.wordTranslate,
        currentWord.audio,
        currentWord.id,
      );
    }
    if (wordIndex < words.length - 1) {
      setWordIndex(wordIndex + 1);
    } else {
      setIsGameFinished(true);
    }
  };

  return (
    <>
      {!isGameFinished ? (
        <section className="game game--audiochallenge">
          <h2>Audiochallenge Page</h2>
          <div className="audio"><PlayAudioButton audioUrl={wordAudio} /></div>
          <OptionsContainer options={answerOptions} clickHandler={(e) => handleClick(e)} />
        </section>
      ) : (
        <ResultGameModal
          rightWords={rightAnswers}
          wrongWords={wrongAnswers}
          clickHandler={restartGame}
        />
      )}
      <div className="leave-btn">
        <LeaveGameButton setVisible={setVisibleLeaveModal} />
        {
          isVisibleLeaveModal
          && (
            <ConfirmModal
              isVisible={isVisibleLeaveModal}
              setVisible={setVisibleLeaveModal}
            />
          )
        }
      </div>

    </>
  );
};

export default Audiochallenge;
