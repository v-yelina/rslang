import React, { FC } from 'react';
import { Progress } from 'antd';

import { Answer, RightAnswer } from '../../../store/types';
import { getPercent } from '../../../utils/helpers/gameHelpers';

import './result-statistic.scss';

export type ResultProps = {
  rightWords: RightAnswer[];
  wrongWords: Answer[];
  maxCombo: number;
  amountNewWords: number | null;
}

const ResultStatistic: FC<ResultProps> = (props) => {
  const {
    rightWords,
    wrongWords,
    maxCombo,
    amountNewWords,
  } = props;

  const percent = getPercent(rightWords.length, wrongWords.length);

  return (
    <div className="statistic">
      <div className="statistic__progress">
        <Progress type="circle" percent={percent} />
        <span>Accuracy</span>
      </div>
      <ul className="statistic__list">
        <li className="statistic__item">{`In a row ${maxCombo}`}</li>
        {
          (amountNewWords !== null)
          && <li className="statistic__item">{`New words ${amountNewWords}`}</li>
        }
      </ul>
    </div>
  );
};

export default ResultStatistic;
