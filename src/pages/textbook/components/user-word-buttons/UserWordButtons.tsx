import React, { FC } from 'react';
import { Modal, Tag, Tooltip } from 'antd';
import {
  StarOutlined,
  StarFilled,
  ThunderboltOutlined,
  ThunderboltFilled,
  BarChartOutlined,
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
import { selectCurrentWords } from '../../../../store/slices/textbook';
import { IUserWord } from '../../../../interfaces/IUserWord';

import './user-word-buttons.scss';

type UserWordButtonsProps = {
  userWord: IUserWord | null;
  wordId: string;
};

const UserWordButtons: FC<UserWordButtonsProps> = ({ userWord, wordId }) => {
  const { userId, token } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const currentWord = useAppSelector(selectCurrentWords).filter((word) => word.id === wordId)[0];

  const isLearned = userWord?.optional.isLearned;
  const isDifficult = userWord?.difficulty === 'difficult';

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

  const showModal = () => {
    Modal.info({
      title: `Learning progress for ${currentWord.word.toUpperCase()}`,
      content: (
        <table className="progress-table">
          <tr>
            <th>GAME</th>
            <th>
              <Tag color="green">RIGHT</Tag>
            </th>
            <th>
              <Tag color="red">WRONG</Tag>
            </th>
          </tr>
          <tr>
            <td>SPRINT</td>
            <td>{!userWord ? '0' : userWord.optional.sprint.rightCounter}</td>
            <td>{!userWord ? '0' : userWord.optional.sprint.wrongCounter}</td>
          </tr>
          <tr>
            <td>AUDIOCHALLENGE</td>
            <td>{!userWord ? '0' : userWord.optional.audiochallenge.rightCounter}</td>
            <td>{!userWord ? '0' : userWord.optional.audiochallenge.wrongCounter}</td>
          </tr>
        </table>
      ),
      className: 'progress-modal',
      onOk() {},
    });
  };

  return (
    <div className="word-card--user-btns">
      <Tooltip placement="right" title={isLearned ? 'REMOVE FROM LEARNED' : 'ADD TO LEARNED'}>
        {isLearned && <StarFilled style={{ color: '#52c41a' }} onClick={handleLearnedClick} />}
        {!isLearned && <StarOutlined onClick={handleLearnedClick} />}
      </Tooltip>
      <Tooltip placement="right" title={isDifficult ? 'REMOVE FROM DIFFICULT' : 'ADD TO DIFFICULT'}>
        {isDifficult && (
          <ThunderboltFilled style={{ color: '#f5222d' }} onClick={handleDifficultClick} />
        )}
        {!isDifficult && <ThunderboltOutlined onClick={handleDifficultClick} />}
      </Tooltip>
      <Tooltip placement="right" title="SHOW PROGRESS">
        <BarChartOutlined onClick={showModal} />
      </Tooltip>
    </div>
  );
};

export default UserWordButtons;
