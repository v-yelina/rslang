import { Button } from 'antd';
import React, { FC } from 'react';
import './sprint-controls.scss';

const SprintControls: FC = () => (
  <div className="sprint__controls controls">
    <Button
      type="primary"
      onClick={() => console.log('Неверно')}
    >
      Неверно
    </Button>
    <Button
      type="primary"
      onClick={() => console.log('верно')}
    >
      Верно
    </Button>
  </div>
);

export default SprintControls;
