import React, { FC } from 'react';
import { Card, Row, Col } from 'antd';
import { IWord } from '../../../../interfaces/IWord';
import PlayAudioButton from '../../../../components/shared/button/play-audio-button';
import BASE_URL from '../../../../constants';

import './word-card.scss';

type WordCardProps = {
  wordData: IWord;
};

const WordCard: FC<WordCardProps> = (props) => {
  const { wordData } = props;
  const {
    word,
    image,
    transcription,
    wordTranslate,
    textMeaning,
    textMeaningTranslate,
    textExample,
    textExampleTranslate,
    audio,
  } = wordData;
  const title = `${word[0].toUpperCase()}${word.slice(1)}`;

  return (
    <div className="word-card">
      <Row gutter={16}>
        <Col span={8}>
          <Card className="word-card--img-container" hoverable={false}>
            <img alt={word} src={`${BASE_URL}${image}`} />
          </Card>
        </Col>
        <Col span={16}>
          <Card className="word-card--text-container" hoverable={false} title={title}>
            <div className="word-card--content-block__pronunciation">
              <PlayAudioButton audioUrl={`${BASE_URL}${audio}`} />
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
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WordCard;
