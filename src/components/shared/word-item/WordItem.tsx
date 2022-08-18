import React, { FC } from 'react';
import { List, Typography } from 'antd';
import { IWord } from '../../../interfaces/IWord';
import PlayAudioButton from '../button/play-audio-button';
import './word-item.scss';

type WordItemProps = Pick<IWord, 'audio' | 'word' | 'wordTranslate'>;

const WordItem:FC<WordItemProps> = (props) => {
  const { audio, word, wordTranslate } = props;

  return (
    <List.Item>
      <div className="word-item">
        <PlayAudioButton audioUrl={audio} />
        <Typography.Text strong>{word}</Typography.Text>
        -
        <Typography.Text>{wordTranslate}</Typography.Text>
      </div>
    </List.Item>
  );
};

export default WordItem;
