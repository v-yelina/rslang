import React, { FC, useState } from 'react';
import LeaveGameButton from '../../../components/shared/button/leave-game-button';
import ConfirmModal from '../../../components/shared/modal/confirm-modal';
import Timer from '../../../components/timer';
import Counter from '../counter';
import SprintField from '../sprint-field';

const SprintGameContainer: FC = () => {
  const [isVisibleLeaveModal, setVisibleLeaveModal] = useState(false);

  return (
    <>
      <div className="sprint__header">
        <Timer />
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
