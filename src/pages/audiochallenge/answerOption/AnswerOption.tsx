import { Button } from 'antd';
import React, { FC } from 'react';

type AnswerOptionProps = { num: string, option: string }

const AnswerOption: FC<AnswerOptionProps> = ({ num, option }: AnswerOptionProps) => (
  <Button type="dashed" className="option-btn">
    {num}
    .&nbsp;
    {option}
  </Button>
);

export default AnswerOption;
