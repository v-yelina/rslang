import React, { FC } from 'react';
import AnswerOption from '../answerOption';

const OptionsContainer: FC = () => (
  <div className="options-container">
    <AnswerOption num="1" />
    <AnswerOption num="2" />
    <AnswerOption num="3" />
    <AnswerOption num="4" />
    <AnswerOption num="5" />
  </div>

);

export default OptionsContainer;
