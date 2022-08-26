import React, { FC } from 'react';
import { Tooltip } from 'antd';
import {
  StarOutlined, StarFilled, FireOutlined, FireFilled,
} from '@ant-design/icons';

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
      <Tooltip placement="right" title={isLearned ? 'REMOVE FROM LEARNED' : 'ADD TO LEARNED'}>
        {isLearned && (
          <StarFilled style={{ fontSize: '24px', color: '#43c043' }} onClick={handleLearnedClick} />
        )}
        {!isLearned && <StarOutlined style={{ fontSize: '24px' }} onClick={handleLearnedClick} />}
      </Tooltip>
      <Tooltip placement="right" title={isDifficult ? 'REMOVE FROM DIFFICULT' : 'ADD TO DIFFICULT'}>
        {isDifficult && (
          <FireFilled
            style={{ fontSize: '24px', color: '#de423a' }}
            onClick={handleDifficultClick}
          />
        )}
        {!isDifficult && (
          <FireOutlined style={{ fontSize: '24px' }} onClick={handleDifficultClick} />
        )}
      </Tooltip>
    </div>
  );
};

export default UserWordButtons;
