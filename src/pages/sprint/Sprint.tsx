import React, { FC, useEffect, useState } from 'react';
import ResultGameModal from '../../components/shared/modal/result-game-modal';
import SprintGameContainer from './sprint-game-container';
import './sprint.scss';

const Sprint: FC = () => {
  const [isGameFinished, setGameFinished] = useState(false);
  const [gameTime, setGameTime] = useState(60);

  useEffect(() => {
    if (gameTime <= 0) {
      setGameFinished(true);
    }
  }, [gameTime]);

  return (
    <section className="sprint">
      {
        !isGameFinished
          ? <SprintGameContainer time={gameTime} setTime={setGameTime} />
          : <ResultGameModal rightWords={[]} wrongWords={[]} />
      }
    </section>
  );
};

export default Sprint;
