import React, { FC } from 'react';
import { List, Typography } from 'antd';
import { IWord } from '../../../interfaces/IWord';
import PlayAudioButton from '../button/play-audio-button';
import './style.scss';

type WordItemProps = Pick<IWord, 'audio' | 'word' | 'wordTranslate'>;

const WordItem:FC<WordItemProps> = (props) => {
  const { audio, word, wordTranslate } = props;

  return (
    <List.Item className="word-item">
      <PlayAudioButton audioUrl={audio} />
      <Typography.Paragraph strong>{word}</Typography.Paragraph>
      -
      <Typography.Paragraph>{wordTranslate}</Typography.Paragraph>
    </List.Item>
  );
};

export default WordItem;
