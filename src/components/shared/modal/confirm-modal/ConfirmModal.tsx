import React, {
  FC, Dispatch, SetStateAction, useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import '../modal.scss';
import { useAppDispatch } from '../../../../store/hooks';
import { clearCurrentGame } from '../../../../store/slices/currentGame';

type ModalProps = {
  isVisible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

const ConfirmModal: FC<ModalProps> = (props) => {
  const dispatch = useAppDispatch();
  const { isVisible, setVisible } = props;
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();

  const hideModal = () => {
    setVisible(false);
  };

  const leaveGame = () => {
    hideModal();
    dispatch(clearCurrentGame());
    navigate('/', { replace: true });
  };

  useEffect(() => {
    modal.confirm({
      title: 'вы уверены что хотите выйти?',
      visible: isVisible,
      onOk: leaveGame,
      onCancel: hideModal,
    });
  }, []);

  return <div>{contextHolder}</div>;
};

export default ConfirmModal;
