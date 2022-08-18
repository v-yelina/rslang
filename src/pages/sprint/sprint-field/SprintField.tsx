import React, { FC } from 'react';
import SprintMultiplier from '../sprint-multiplier';

const SprintField: FC = () => (
  <div className="sprint__field">
    <SprintMultiplier />
    <div className="sprint__round" />
    <div className="sprint__controls" />
  </div>
);

export default SprintField;
