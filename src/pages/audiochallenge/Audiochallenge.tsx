import React, {
  FC, MouseEventHandler, useEffect, useState,
} from 'react';
import PlayAudioButton from '../../components/shared/button/play-audio-button';
import OptionsContainer from './optionsContainer';
import soud1 from '../../assets/demo/01_0001.mp3';
import './audiochallenge.scss';
import { useAppSelector } from '../../store/hooks';
import { checkAnswer, getAnswerOptions, getAnswerText } from './audioChallengeGame';

const Audiochallenge: FC = () => {
  const { words } = useAppSelector((state) => state.rootReducer.currentGame);
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(words[wordIndex]);
  const [answerOptions, setAnswerOptions] = useState(getAnswerOptions(currentWord, words));

  useEffect(() => {
    setCurrentWord(words[wordIndex]);
  }, [wordIndex]);

  useEffect(() => {
    setAnswerOptions(getAnswerOptions(currentWord, words));
  }, [currentWord]);

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    const answer = getAnswerText(e as unknown as MouseEvent);
    if (answer) {
      const isRightAnswer = checkAnswer(answer, currentWord.wordTranslate);
      console.log(answer);
      console.log(isRightAnswer);
    }
    setWordIndex(wordIndex + 1);
  };

  return (
    <section className="game game--audiochallenge">
      <h2>Audiochallenge Page</h2>
      <div className="audio"><PlayAudioButton audioUrl={soud1} /></div>
      <OptionsContainer options={answerOptions} clickHandler={(e) => handleClick(e)} />
    </section>

  );
};

export default Audiochallenge;
