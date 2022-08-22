import React, { FC, useState } from 'react';
import ResultGameModal from '../../components/shared/modal/result-game-modal';
import SprintGameContainer from './sprint-game-container';
import './sprint.scss';

const Sprint: FC = () => {
  const [isGameFinished, setGameFinished] = useState(false);

  return (
    <section className="sprint">
      {
        !isGameFinished
          ? <SprintGameContainer />
          : <ResultGameModal rightWords={[]} wrongWords={[]} />
      }
    </section>
  );
};

export default Sprint;
