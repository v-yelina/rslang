import React, { FC } from 'react';
import { Button } from 'antd';
import AnswerOption from '../answerOption';

const OptionsContainer: FC = () => (
  <div className="options-container">
    <AnswerOption num="1" />
    <AnswerOption num="2" />
    <AnswerOption num="3" />
    <AnswerOption num="4" />
    <AnswerOption num="5" />
    <Button type="dashed">Don&lsquo;t know</Button>
  </div>
);

export default OptionsContainer;
