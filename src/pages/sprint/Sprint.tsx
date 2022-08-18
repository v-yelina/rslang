import React, { FC, useState } from 'react';
import LeaveGameButton from '../../components/shared/button/leave-game-button';
import ConfirmModal from '../../components/shared/modal/confirm-modal';
import Timer from '../../components/timer';
import './sprint.scss';

const Sprint: FC = () => {
  const [isVisibleLeaveModal, setVisibleLeaveModal] = useState(false);

  return (
    <section className="sprint">
      <div className="sprint__header">
        <Timer />
        <LeaveGameButton setVisible={setVisibleLeaveModal} />
      </div>
      <div className="sprint__field" />
      {
        isVisibleLeaveModal
        && (
        <ConfirmModal
          isVisible={isVisibleLeaveModal}
          setVisible={setVisibleLeaveModal}
        />
        )
      }
    </section>
  );
};

export default Sprint;
