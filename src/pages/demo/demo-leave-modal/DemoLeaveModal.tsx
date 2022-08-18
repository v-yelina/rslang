import React, { FC, useState } from 'react';
import { Button } from 'antd';
import ConfirmModal from '../../../components/shared/modal/confirm-modal';

const DemoLeaveModal:FC = () => {
  const [isVisible, setVisible] = useState(false);

  return (
    <div className="space">
      <Button onClick={() => setVisible(true)}>Show Leave Modal</Button>
      { isVisible && <ConfirmModal isVisible={isVisible} setVisible={setVisible} /> }
    </div>
  );
};

export default DemoLeaveModal;
