import React, { FC } from 'react';
import SprintMultiplier from '../sprint-multiplier';
import SprintWords from '../sprint-words';

const SprintField: FC = () => (
  <div className="sprint__field">
    <SprintMultiplier />
    <SprintWords
      word="arrive"
      wordTranslate="прибыть"
    />
    <div className="sprint__controls" />
  </div>
);

export default SprintField;
