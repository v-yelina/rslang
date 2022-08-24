import React, { FC } from 'react';
import {
  Card, Row, Col, Button,
} from 'antd';
import { AggregatedWord } from '../../../../store/slices/textbook';
import PlayAudioButton from '../../../../components/shared/button/play-audio-button';
import ENV from '../../../../config/config';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectIsLogged, selectUser } from '../../../../store/slices/auth';
import { createUserWordFromTextbook, updateUserWordFromTextbook } from '../../../../store/thunks';
import { prepareNewLearnedWord, updateLearnedWord } from '../../helpers';

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
  const { userId, token } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleLearnedClick = () => {
    if (!userWord) {
      const newUserWord = prepareNewLearnedWord();
      dispatch(
        createUserWordFromTextbook({
          userId,
          token,
          wordId: id,
          userWord: newUserWord,
        }),
      );
    } else {
      const newUserWord = updateLearnedWord(userWord);
      dispatch(
        updateUserWordFromTextbook({
          userId,
          token,
          wordId: id,
          userWord: newUserWord,
        }),
      );
    }
  };

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
            {isLogged && (
              <div className="word-card--user-btns">
                <Button type="primary" onClick={handleLearnedClick}>
                  {userWord?.optional?.isLearned ? 'REMOVE FROM LEARNED' : 'ADD TO LEARNED'}
                </Button>
              </div>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default WordCard;
