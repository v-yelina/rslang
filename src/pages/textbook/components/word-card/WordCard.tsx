import React, { FC } from 'react';
import { AggregatedWord } from '../../../../interfaces/IWord';
import UserWordButtons from '../user-word-buttons';
import AudioButton from '../audio-button';
import ENV from '../../../../config/config';

import { useAppSelector } from '../../../../store/hooks';
import { selectIsLogged } from '../../../../store/slices/auth';

import './word-card.scss';

type WordCardProps = {
  wordData: AggregatedWord;
  player: HTMLAudioElement;
};

const WordCard: FC<WordCardProps> = (props) => {
  const { wordData, player } = props;
  const {
    id,
    word,
    image,
    transcription,
    wordTranslate,
    textMeaning,
    textMeaningTranslate,
    textExample,
    textExampleTranslate,
    audio,
    audioMeaning,
    audioExample,
    userWord,
  } = wordData;
  const title = word;
  const isLogged = useAppSelector(selectIsLogged);

  const audioLinks = [
    `${ENV.BASE_URL}${audio}`,
    `${ENV.BASE_URL}${audioMeaning}`,
    `${ENV.BASE_URL}${audioExample}`,
  ];

  return (
    <div
      className={`word-card ${userWord && userWord.optional.isLearned ? 'word-card--learned' : ''}`}
    >
      {userWord && userWord.optional.isLearned && <div className="learned-badge">LEARNED</div>}

      <div className="word-card--img-container">
        <img alt={word} src={`${ENV.BASE_URL}${image}`} />
      </div>
      <div className="word-card--text-container">
        <div className="word-card--text">
          <div className="word-card--content-block__pronunciation">
            <p>
              <span className="word-title">{title.toUpperCase()}</span>
              <span>{transcription}</span>
            </p>
            <AudioButton player={player} audioLinks={audioLinks} />
          </div>

          <div className="word-card--content-block">
            <p>{wordTranslate}</p>
          </div>
          <div className="word-card--content-block">
            <p dangerouslySetInnerHTML={{ __html: textMeaning }} />
            <p>{textMeaningTranslate}</p>
          </div>
          <div className="word-card--content-block">
            <p dangerouslySetInnerHTML={{ __html: textExample }} />
            <p>{textExampleTranslate}</p>
          </div>
        </div>
        {isLogged && <UserWordButtons userWord={userWord} wordId={id} />}
      </div>
    </div>
  );
};

export default WordCard;
