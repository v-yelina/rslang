import React, { FC, MouseEventHandler } from 'react';
import AnswerOption from '../answerOption';

type OptionsContainerProps = { options: string[]; clickHandler: MouseEventHandler<HTMLDivElement> };

const OptionsContainer: FC<OptionsContainerProps> = ({ options, clickHandler }) => (
  <div className="options-container" onClick={(e) => clickHandler(e)}>
    {options.map((option, index) => (
      <AnswerOption num={String(index + 1)} option={option} key={option} />
    ))}
  </div>
);

export default OptionsContainer;
