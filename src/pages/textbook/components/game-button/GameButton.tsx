import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { setGameType, setWordsSource } from '../../../../store/slices/currentGame';
import { GameType } from '../../../../store/types';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectCurrentWords } from '../../../../store/slices/textbook';

import './game-button.scss';

type GameButtonProps = {
  game: GameType;
};

const GameButton: FC<GameButtonProps> = ({ game }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentWords = useAppSelector(selectCurrentWords);

  const isPageLearned = currentWords.every(
    (word) => word.userWord && word.userWord.optional.isLearned,
  );

  const handleGameClick = () => {
    dispatch(setGameType(game));
    dispatch(setWordsSource('textbook'));
    navigate('/games');
  };

  return (
    <button
      className={`textbook-btn ${
        game === 'sprint' ? 'textbook-sprint-btn' : 'textbook-challenge-btn'
      }`}
      type="button"
      onClick={handleGameClick}
      disabled={isPageLearned}
    >
      <span>{game!.toUpperCase()}</span>
    </button>
  );
};

export default GameButton;
