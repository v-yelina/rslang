import React, { FC } from 'react';
import { Button } from 'antd';
import AnswerOption from '../answerOption';

type OptionsContainerProps = { options: string[] };

const OptionsContainer: FC<OptionsContainerProps> = ({ options }) => (
  <div className="options-container">
    <AnswerOption num="1" option={options[0]} />
    <AnswerOption num="2" option={options[1]} />
    <AnswerOption num="3" option={options[2]} />
    <AnswerOption num="4" option={options[3]} />
    <AnswerOption num="5" option={options[4]} />
    <Button type="dashed">Don&lsquo;t know</Button>
  </div>
);

export default OptionsContainer;
