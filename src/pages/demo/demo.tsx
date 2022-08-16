import React, { FC } from 'react';
import { Space } from 'antd';
import PlayAudioButton from '../../components/shared/play-audio-button';
import soud1 from '../../assets/demo/01_0001.mp3';
import soud2 from '../../assets/demo/01_0002.mp3';
import soud3 from '../../assets/demo/01_0003.mp3';
import './demo.scss';
import WordItem from '../../components/shared/word-item';

type DemoWord = {
  audio: string;
  word: string;
  wordTranslate: string;
};

const data: DemoWord[] = [
  {
    audio: soud1,
    word: 'agree',
    wordTranslate: 'соглашаться',
  },
  {
    audio: soud2,
    word: 'alcohol',
    wordTranslate: 'алкоголь',
  },
  {
    audio: soud3,
    word: 'arrive',
    wordTranslate: 'прибыть',
  },
];

const Demo: FC = () => (
  <div className="demo">
    <h2>Demo page</h2>
    <Space size="large" className="space">
      Play audio button:
      {data.map((item) => <PlayAudioButton audioUrl={item.audio} />)}
    </Space>
    <Space>
      {data.map((item) => {
        const { audio, word, wordTranslate } = item;
        return <WordItem audio={audio as 'string'} word={word as 'string'} wordTranslate={wordTranslate as 'string'} />;
      })}
    </Space>
  </div>
);

export default Demo;
