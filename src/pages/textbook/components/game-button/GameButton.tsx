import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { setGameType, setWordsSource } from '../../../../store/slices/currentGame';
import { useAppDispatch } from '../../../../store/hooks';
import { GameType } from '../../../../store/types';

type GameButtonProps = {
  game: GameType;
};

const GameButton: FC<GameButtonProps> = ({ game }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGameClick = () => {
    dispatch(setGameType(game));
    dispatch(setWordsSource('textbook'));
    navigate('/games');
  };

  return (
    <Button type="primary" onClick={handleGameClick}>
      {game!.toUpperCase()}
    </Button>
  );
};

export default GameButton;
