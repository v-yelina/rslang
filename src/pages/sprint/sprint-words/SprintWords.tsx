import React, { FC } from 'react';
import { Typography } from 'antd';

import { IWord } from '../../../interfaces/IWord';

import './sprint-words.scss';

type SprintWordsProps = Pick<IWord, 'word' | 'wordTranslate'>;

const SprintWords: FC<SprintWordsProps> = (props) => {
  const { word, wordTranslate } = props;

  return (
    <div className="sprint__words words">
      <Typography.Title level={3}>{word}</Typography.Title>
      <Typography.Text>{wordTranslate}</Typography.Text>
    </div>
  );
};

export default SprintWords;
