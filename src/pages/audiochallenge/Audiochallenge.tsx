import React, { FC } from 'react';
import PlayAudioButton from '../../components/shared/button/play-audio-button';
import OptionsContainer from './optionsContainer';
import soud1 from '../../assets/demo/01_0001.mp3';
import './audiochallenge.scss';
import { useAppSelector } from '../../store/hooks';
import { getAnswerOptions } from './audioChallengeGame';

const Audiochallenge: FC = () => {
  const { words } = useAppSelector((state) => state.rootReducer.currentGame);
  const answerOptions = getAnswerOptions(words[0], words);

  return (
    <section className="game game--audiochallenge">
      <h2>Audiochallenge Page</h2>
      <div className="audio"><PlayAudioButton audioUrl={soud1} /></div>
      <OptionsContainer options={answerOptions} />
    </section>

  );
};

export default Audiochallenge;
