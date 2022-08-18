import { Button } from 'antd';
import React, { FC } from 'react';

type AnswerOptionProps = {num: string}

const AnswerOption: FC<AnswerOptionProps> = ({ num }: AnswerOptionProps) => (
  <Button type="dashed" className="option-btn">
    <span className="number">
      { num }
      .
    </span>
    <span className="word">word</span>
  </Button>
);

export default AnswerOption;
