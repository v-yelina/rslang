import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { setGameType, setWordsSource } from '../../../../store/slices/currentGame';
import { RocketTwoTone, SoundTwoTone } from '@ant-design/icons';
import { GameType } from '../../../../store/types';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectCurrentWords } from '../../../../store/slices/textbook';

type GameButtonProps = {
  game: GameType;
};

const GameButton: FC<GameButtonProps> = ({ game }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentWords = useAppSelector(selectCurrentWords);

  const isPageLearned = currentWords.every(
    (word) => word.userWord && word.userWord.optional.isLearned
  );

  const handleGameClick = () => {
    dispatch(setGameType(game));
    dispatch(setWordsSource('textbook'));
    navigate('/games');
  };

  return (
    <Button
      type="default"
      shape="round"
      size="large"
      icon={game === 'sprint' ? <RocketTwoTone /> : <SoundTwoTone />}
      onClick={handleGameClick}
      disabled={isPageLearned}
    >
      {game!.toUpperCase()}
    </Button>
  );
};

export default GameButton;
