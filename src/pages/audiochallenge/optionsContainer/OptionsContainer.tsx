import React, { FC, MouseEventHandler } from 'react';
import AnswerOption from '../answerOption';

/* eslint-disable */
type OptionsContainerProps = { options: string[]; clickHandler: MouseEventHandler<HTMLDivElement> };

const OptionsContainer: FC<OptionsContainerProps> = ({ options, clickHandler }) => (
  <div className="options-container" onClick={(e) => clickHandler(e)}>
    <AnswerOption num="1" option={options[0]} />
    <AnswerOption num="2" option={options[1]} />
    <AnswerOption num="3" option={options[2]} />
    <AnswerOption num="4" option={options[3]} />
    <AnswerOption num="5" option={options[4]} />
    <AnswerOption num="6" option='Don&lsquo;t know' />
  </div>
);

export default OptionsContainer;
