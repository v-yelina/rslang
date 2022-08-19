import React, { FC } from 'react';
import SprintControls from '../sprint-controls';
import SprintMultiplier from '../sprint-multiplier';
import SprintWords from '../sprint-words';

const SprintField: FC = () => (
  <div className="sprint__field">
    <SprintMultiplier />
    <SprintWords
      word="arrive"
      wordTranslate="прибыть"
    />
    <SprintControls />
  </div>
);

export default SprintField;
