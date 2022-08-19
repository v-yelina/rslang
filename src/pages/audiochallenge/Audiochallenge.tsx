import React, {
  FC, MouseEventHandler, useEffect, useState,
} from 'react';
import PlayAudioButton from '../../components/shared/button/play-audio-button';
import OptionsContainer from './optionsContainer';
import './audiochallenge.scss';
import { useAppSelector } from '../../store/hooks';
import { checkAnswer, getAnswerOptions, getAnswerText } from './audioChallengeGame';
import ENV from '../../config/config';

const Audiochallenge: FC = () => {
  const { words } = useAppSelector((state) => state.rootReducer.currentGame);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[wordIndex]);
  const [answerOptions, setAnswerOptions] = useState(getAnswerOptions(currentWord, words));
  const [wordAudio, setWordAudio] = useState(ENV.BASE_URL as string + currentWord.audio);

  useEffect(() => {
    setCurrentWord(words[wordIndex]);
  }, [wordIndex]);

  useEffect(() => {
    setAnswerOptions(getAnswerOptions(currentWord, words));
    setWordAudio(ENV.BASE_URL as string + currentWord.audio);
  }, [currentWord]);

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    let answer = getAnswerText(e as unknown as MouseEvent);
    if (answer) {
      let isRightAnswer: boolean;
      if (answer === 'Don‘t know') {
        isRightAnswer = false;
        answer = "-"
      } else {
        isRightAnswer = checkAnswer(answer, currentWord.wordTranslate);
      }
    }
    setWordIndex(wordIndex + 1);
  };

  return (
    <section className="game game--audiochallenge">
      <h2>Audiochallenge Page</h2>
      <div className="audio"><PlayAudioButton audioUrl={wordAudio} /></div>
      <OptionsContainer options={answerOptions} clickHandler={(e) => handleClick(e)} />
    </section>

  );
};

export default Audiochallenge;
