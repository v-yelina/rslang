import { type } from '@testing-library/user-event/dist/type';
import { Card } from 'antd';
import React, {
  FC
} from 'react';
import ENV from '../../../config/config';
import { WordToTrain } from '../../../store/types';

type RightAnswerCardProps = {
  word: WordToTrain;
}

const RightAnswerCard: FC<RightAnswerCardProps> = (props) => {
  const { image, word, wordTranslate } = props.word;
  const { Meta } = Card;
  return (
    <Card
      style={{ width: 240 }}
      cover={<img alt="Right answer" src={`${ENV.BASE_URL}${image}`} />}>
      <Meta title={word} description={wordTranslate} />
    </Card>
  )
}

export default RightAnswerCard;
