import React, { FC } from 'react';

type AnswerOptionProps = {num: string}

const AnswerOption: FC<AnswerOptionProps> = ({ num }: AnswerOptionProps) => (
  <button type="button">
    <span>
      { num }
      .
    </span>
    word
  </button>
);

export default AnswerOption;
