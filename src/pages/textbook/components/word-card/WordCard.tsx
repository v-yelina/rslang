import React, { FC } from 'react';
import { Card, Row, Col } from 'antd';
import { AggregatedWord } from '../../../../interfaces/IWord';
import PlayAudioButton from '../../../../components/shared/button/play-audio-button';
import UserWordButtons from '../user-word-buttons';
import ENV from '../../../../config/config';

import { useAppSelector } from '../../../../store/hooks';
import { selectIsLogged } from '../../../../store/slices/auth';

import './word-card.scss';

type WordCardProps = {
  wordData: AggregatedWord;
};

const WordCard: FC<WordCardProps> = (props) => {
  const { wordData } = props;
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
    userWord,
  } = wordData;
  const title = `${word[0].toUpperCase()}${word.slice(1)}`;
  const isLogged = useAppSelector(selectIsLogged);

  return (
    <div
      className={`word-card ${userWord && userWord.optional.isLearned ? 'word-card--learned' : ''}`}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Card className="word-card--img-container" hoverable={false}>
            <img alt={word} src={`${ENV.BASE_URL}${image}`} />
          </Card>
        </Col>
        <Col span={16}>
          <Card className="word-card--text-container" hoverable={false} title={title}>
            <div className="word-card--content-block__pronunciation">
              <PlayAudioButton audioUrl={`${ENV.BASE_URL}${audio}`} />
              <p>{transcription}</p>
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
            {isLogged && <UserWordButtons userWord={userWord} wordId={id} />}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WordCard;
