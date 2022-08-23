import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { gameType, setGameType, setWordsSource } from '../../../../store/slices/currentGame';
import { useAppDispatch } from '../../../../store/hooks';

type GameButtonProps = {
  game: gameType;
};

const GameButton: FC<GameButtonProps> = ({ game }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleGameClick = () => {
    dispatch(setGameType(game));
    dispatch(setWordsSource('textbook'));
    navigate(`/${game}`);
  };

  return (
    <Button type="primary" onClick={() => handleGameClick()}>
      {game!.toUpperCase()}
    </Button>
  );
};

export default GameButton;
