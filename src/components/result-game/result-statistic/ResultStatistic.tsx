import React, { FC } from 'react';
import { Progress } from 'antd';

import { Answer, RightAnswer } from '../../../store/types';

import './result-statistic.scss';
import { getPercent } from '../../../utils/helpers/gameHelpers';

export type ResultProps = {
  rightWords: RightAnswer[];
  wrongWords: Answer[];
}

const ResultStatistic: FC<ResultProps> = (props) => {
  const { rightWords, wrongWords } = props;

  const percent = getPercent(rightWords.length, wrongWords.length);

  return (
    <div className="statistic">
      <div className="statistic__progress">
        <Progress type="circle" percent={percent} />
        <span>Точность</span>
      </div>
      <ul className="statistic__list">
        <li className="statistic__item">{`In a row ${0}`}</li>
        <li className="statistic__item">{`New words ${0}`}</li>
      </ul>
    </div>
  );
};

export default ResultStatistic;
