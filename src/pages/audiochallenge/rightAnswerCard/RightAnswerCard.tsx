import React, {
  FC,
} from 'react';
import { Card } from 'antd';
import ENV from '../../../config/config';
import { WordToTrain } from '../../../store/types';

type RightAnswerCardProps = {
  word: WordToTrain;
}

const RightAnswerCard: FC<RightAnswerCardProps> = (props) => {
  const { word } = props;
  const { Meta } = Card;
  return (
    <Card
      style={{ width: 240 }}
      cover={<img alt="Right answer" src={`${ENV.BASE_URL}${word.image}`} />}
    >
      <Meta title={word.word} description={word.wordTranslate} />
    </Card>
  );
};

export default RightAnswerCard;
