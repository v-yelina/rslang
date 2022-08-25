import React, { FC } from 'react';
import { Space, List } from 'antd';
import PlayAudioButton from '../../components/shared/button/play-audio-button';
import soud1 from '../../assets/demo/01_0001.mp3';
import soud2 from '../../assets/demo/01_0002.mp3';
import soud3 from '../../assets/demo/01_0003.mp3';
import WordItem from '../../components/shared/word-item';
import DemoLeaveModal from './demo-leave-modal/DemoLeaveModal';
import ResultGame from '../../components/result-game';
import LevelSelect from '../../components/level-select';
import './demo.scss';

type DemoWord = {
  id: string;
  audio: string;
  word: string;
  wordTranslate: string;
  answer: string;
};

const data: DemoWord[] = [
  {
    id: '1',
    audio: soud1,
    word: 'agree',
    wordTranslate: 'соглашаться',
    answer: 'приезжать',
  },
  {
    id: '2',
    audio: soud2,
    word: 'alcohol',
    wordTranslate: 'алкоголь',
    answer: 'копать',
  },
  {
    id: '3',
    audio: soud3,
    word: 'arrive',
    wordTranslate: 'прибыть',
    answer: 'прибыть',
  },
];

const rightWords: DemoWord[] = [];
const wrongWords: DemoWord[] = [];

data.filter((item, i) => (
  (i < 2)
    ? wrongWords.push(item)
    : rightWords.push(item)
));

const Demo: FC = () => (
  <div className="demo">
    <h2>Demo page</h2>
    <Space size="large" className="space">
      Play audio button:
      <List
        className="demo__list"
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <PlayAudioButton
            key={item.word}
            audioUrl={item.audio}
          />
        )}
      />
    </Space>
    <List
      size="small"
      dataSource={data}
      renderItem={(item) => (
        <WordItem
          key={item.word}
          audio={item.audio}
          word={item.word}
          wordTranslate={item.wordTranslate}
        />
      )}
    />
    <DemoLeaveModal />
    <ResultGame
      rightWords={rightWords}
      wrongWords={wrongWords}
      clickHandler={() => { console.log('New game'); }}
    />
    <LevelSelect gameName="Sprint" />
  </div>
);

export default Demo;
