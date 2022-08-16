import React, { FC } from 'react';
import PlayAudioButton from '../../components/shared/button';
import soud1 from '../../assets/demo/01_0001.mp3';
import soud2 from '../../assets/demo/01_0002.mp3';
import soud3 from '../../assets/demo/01_0003.mp3';

const Demo: FC = () => (
  <div>
    <h2>Demo page</h2>
    <PlayAudioButton audioUrl={soud1} />
    <PlayAudioButton audioUrl={soud2} />
    <PlayAudioButton audioUrl={soud3} />
  </div>
);

export default Demo;
