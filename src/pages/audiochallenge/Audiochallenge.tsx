import React, { FC, MouseEventHandler, useState } from 'react';
import PlayAudioButton from '../../components/shared/button/play-audio-button';
import OptionsContainer from './optionsContainer';
import soud1 from '../../assets/demo/01_0001.mp3';
import './audiochallenge.scss';
import { useAppSelector } from '../../store/hooks';
import { getAnswerOptions, getAnswerText } from './audioChallengeGame';

const Audiochallenge: FC = () => {
  const { words } = useAppSelector((state) => state.rootReducer.currentGame);
  const answerOptions = getAnswerOptions(words[0], words);
  const [wordIndex, setWordIndex] = useState(0);
  console.log(wordIndex);

  const handleClick: MouseEventHandler = (e) => {
    e.preventDefault();
    setWordIndex(0);
    const answer = getAnswerText(e);
    console.log(answer);
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
