import React, { FC } from 'react';
import PlayAudioButton from '../../components/shared/button/play-audio-button';
import OptionsContainer from './optionsContainer';
import soud1 from '../../assets/demo/01_0001.mp3';
import './audiochallenge.scss';

const Audiochallenge: FC = () => (
  <section className="game game--audiochallenge">
    <h2>Audiochallenge Page</h2>
    <div className="audio"><PlayAudioButton audioUrl={soud1} /></div>
    <OptionsContainer />
  </section>

);

export default Audiochallenge;
