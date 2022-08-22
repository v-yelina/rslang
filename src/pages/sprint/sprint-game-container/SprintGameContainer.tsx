import React, {
  Dispatch, FC, SetStateAction, useState,
} from 'react';
import LeaveGameButton from '../../../components/shared/button/leave-game-button';
import ConfirmModal from '../../../components/shared/modal/confirm-modal';
import Timer from '../../../components/timer';
import Counter from '../counter';
import SprintField from '../sprint-field';

type GameContainerProps = {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

const SprintGameContainer: FC<GameContainerProps> = (props) => {
  const [isVisibleLeaveModal, setVisibleLeaveModal] = useState(false);
  const { time, setTime } = props;

  return (
    <>
      <div className="sprint__header">
        <Timer
          time={time}
          setTime={setTime}
        />
        <LeaveGameButton setVisible={setVisibleLeaveModal} />
      </div>
      <Counter count={0} />
      <SprintField />
      {
        isVisibleLeaveModal
        && (
        <ConfirmModal
          isVisible={isVisibleLeaveModal}
          setVisible={setVisibleLeaveModal}
        />
        )
      }
    </>
  );
};

export default SprintGameContainer;
