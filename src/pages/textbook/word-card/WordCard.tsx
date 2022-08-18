import React, { FC } from 'react';
import { IWord } from '../../../interfaces/IWord';

import './word-card.scss';

type WordCardProps = {
  wordData: IWord;
}

const WordCard: FC<WordCardProps> = (props) => {
  const {wordData} = props;
return <div className="ok">{wordData.word}</div>;}

export default WordCard;
