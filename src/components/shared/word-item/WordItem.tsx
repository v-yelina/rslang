import React, { FC } from 'react';
import { List, Typography } from 'antd';
import { IWord } from '../../../interfaces/IWord';
import PlayAudioButton from '../button/play-audio-button';
import './word-item.scss';

type WordItemProps = Pick<IWord, 'audio' | 'word' | 'wordTranslate'>;

const { Text } = Typography;

const WordItem:FC<WordItemProps> = (props) => {
  const { audio, word, wordTranslate } = props;

  return (
    <List.Item>
      <div className="word-item">
        <PlayAudioButton audioUrl={audio} />
        <Text strong>{word}</Text>
        -
        <Text>{wordTranslate}</Text>
      </div>
    </List.Item>
  );
};

export default WordItem;
