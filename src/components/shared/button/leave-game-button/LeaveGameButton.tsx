import React, { Dispatch, FC, SetStateAction } from 'react';
import { Button } from 'antd';
import { ReactComponent as CancelIcon } from '../../../../assets/icons/cancel.svg';

type LeaveGameProps = {
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const LeaveGameButton: FC<LeaveGameProps> = (props) => {
  const { setVisible } = props;

  return (
    <Button
      type="text"
      icon={<CancelIcon />}
      onClick={() => setVisible(true)}
    />
  );
};

export default LeaveGameButton;
