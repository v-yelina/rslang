import React, { Dispatch, FC, SetStateAction } from 'react';

import Timer from '../../../components/timer';
import Counter from '../counter';
import SprintField from '../sprint-field';

type GameContainerProps = {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

const SprintGameContainer: FC<GameContainerProps> = (props) => {
  const { time, setTime } = props;

  return (
    <>
      <div className="sprint__header">
        <Timer
          time={time}
          setTime={setTime}
        />
      </div>
      <Counter />
      <SprintField />
    </>
  );
};

export default SprintGameContainer;
