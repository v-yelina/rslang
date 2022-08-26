import React, { FC } from 'react';
import { Button } from 'antd';

import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { createUserWordFromTextbook, updateUserWordFromTextbook } from '../../../../store/thunks';
import {
  prepareNewDifficultWord,
  prepareNewLearnedWord,
  updateDifficultWord,
  updateLearnedWord,
} from '../../helpers';
import { selectUser } from '../../../../store/slices/auth';
import { IUserWord } from '../../../../interfaces/IUserWord';

import './user-word-buttons.scss';

type UserWordButtonsProps = {
  userWord: IUserWord | null;
  wordId: string;
};

const UserWordButtons: FC<UserWordButtonsProps> = ({ userWord, wordId }) => {
  const { userId, token } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const isLearned = userWord?.optional.isLearned;
  const isDifficult = userWord?.difficulty === 'difficult';

  console.log('LEARNED??? ', isLearned);
  console.log('DIFFICULT??? ', isDifficult);

  const handleLearnedClick = () => {
    if (!userWord) {
      const newUserWord = prepareNewLearnedWord();
      dispatch(
        createUserWordFromTextbook({
          userId,
          token,
          wordId,
          userWord: newUserWord,
        }),
      );
    } else {
      const newUserWord = updateLearnedWord(userWord);
      dispatch(
        updateUserWordFromTextbook({
          userId,
          token,
          wordId,
          userWord: newUserWord,
        }),
      );
    }
  };

  const handleDifficultClick = () => {
    if (!userWord) {
      const newUserWord = prepareNewDifficultWord();
      dispatch(
        createUserWordFromTextbook({
          userId,
          token,
          wordId,
          userWord: newUserWord,
        }),
      );
    } else {
      const newUserWord = updateDifficultWord(userWord);
      dispatch(
        updateUserWordFromTextbook({
          userId,
          token,
          wordId,
          userWord: newUserWord,
        }),
      );
    }
  };

  return (
    <div className="word-card--user-btns">
      <Button type="primary" onClick={handleLearnedClick}>
        {isLearned ? 'REMOVE FROM LEARNED' : 'ADD TO LEARNED'}
      </Button>
      <Button type="primary" onClick={handleDifficultClick}>
        {isDifficult ? 'REMOVE FROM DIFFICULT' : 'ADD TO DIFFICULT'}
      </Button>
    </div>
  );
};

export default UserWordButtons;
