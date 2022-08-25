import React, { FC } from 'react';
import { List, Typography } from 'antd';
import { IWord } from '../../../interfaces/IWord';
import PlayAudioButton from '../button/play-audio-button';
import './word-item.scss';

type WordItemProps = Pick<IWord, 'audio' | 'word' | 'wordTranslate'>;

const { Text } = Typography;
const { Item } = List;

const WordItem: FC<WordItemProps> = (props) => {
  const { audio, word, wordTranslate } = props;

  return (
    <Item>
      <div className="word-item">
        <PlayAudioButton audioUrl={audio} autoplay={false} />
        <Text strong>{word}</Text>
        -
        <Text>{wordTranslate}</Text>
      </div>
    </Item>
  );
};

export default WordItem;
