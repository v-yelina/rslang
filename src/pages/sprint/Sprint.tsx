import React, {
  FC, useEffect, useRef, useState,
} from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearSprintState, setCurrentWord } from '../../store/slices/sprintGame';
import ResultGame from '../../components/result-game';
import SprintGameContainer from './sprint-game-container';
import { DURATION_GAME_SPRINT } from '../../constants';
import { Answer } from '../../store/types';
import { getRandomTranslate } from './sprintGame';
import LeaveGameButton from '../../components/shared/button/leave-game-button';
import ConfirmModal from '../../components/shared/modal/confirm-modal';
import {
  createUserWordFromTextbook,
  fetchUserSettings,
  fetchUserStatistic,
  updateSettings,
  updateStatistic,
  updateUserWordFromTextbook,
} from '../../store/thunks';
import { IDayStat, ISettings } from '../../interfaces/ISettings';
import {
  checkDate, countNewWords, getNewDayStat, getToday, updateWord,
} from '../statistics/helpers';
import { initialState } from '../../store/slices/statistic';
import { IStatistic } from '../../interfaces/IStatistic';

import './sprint.scss';

const Sprint: FC = () => {
  const dispatch = useAppDispatch();
  const {
    roundIndex,
    rightAnswers,
    wrongAnswers,
  } = useAppSelector((state) => state.sprintGame);
  const {
    words,
    randomWords,
    maxCombo,
  } = useAppSelector((state) => state.currentGame);
  const {
    statistic,
    settings,
  } = useAppSelector((state) => state.statistic);
  const {
    user,
    isLogged,
  } = useAppSelector((state) => state.auth);

  const [isGameFinished, setGameFinished] = useState(false);
  const [gameTime, setGameTime] = useState(DURATION_GAME_SPRINT);
  const [isVisibleLeaveModal, setVisibleLeaveModal] = useState(false);
  const learned = useRef(0);

  const sendDayStatistic = (newDayStat: IDayStat) => {
    const newDate: string = statistic.optional.statisticDay;
    const newStat: IDayStat = {
      newWordsCount: newDayStat.newWordsCount,
      gamesCount: newDayStat.gamesCount,
    };
    const newOptional = {};
    Object.defineProperty(newOptional, newDate, {
      value: { ...newStat },
      writable: true,
      enumerable: true,
    });
    Object.assign(newOptional, settings.optional);
    const newSettings: ISettings = {
      wordsPerDay: settings.wordsPerDay,
      optional: newOptional,
    };

    dispatch(updateSettings({
      userId: user.userId,
      token: user.token,
      settings: newSettings,
    }));
  };

  const updateAnswersData = (right: Answer[], wrong: Answer[]) => {
    right.forEach((answer) => {
      const isNew = !answer.optional;
      const updateData = updateWord({ isRight: true, answer }, 'sprint');
      if (updateData.newLearned) {
        const prevLearned = learned.current;
        learned.current = prevLearned + 1;
      }
      if (!isNew) {
        dispatch(updateUserWordFromTextbook({
          userId: user.userId,
          token: user.token,
          wordId: answer.id,
          userWord: { ...updateData.newStatistic },
        }));
      } else {
        dispatch(createUserWordFromTextbook({
          userId: user.userId,
          token: user.token,
          wordId: answer.id,
          userWord: { ...updateData.newStatistic },
        }));
      }
    });
    wrong.forEach((answer) => {
      const isNew = !answer.optional;
      const updateData = updateWord({ isRight: false, answer }, 'sprint');
      if (!isNew) {
        dispatch(updateUserWordFromTextbook({
          userId: user.userId,
          token: user.token,
          wordId: answer.id,
          userWord: { ...updateData.newStatistic },
        }));
      } else {
        dispatch(createUserWordFromTextbook({
          userId: user.userId,
          token: user.token,
          wordId: answer.id,
          userWord: { ...updateData.newStatistic },
        }));
      }
    });
  };

  const getNewStatistic = () => {
    if (!checkDate(statistic.optional.statisticDay, getToday())) {
      const dayStat = getNewDayStat(statistic);
      sendDayStatistic(dayStat);
      dispatch(updateStatistic({
        userId: user.userId,
        token: user.token,
        statistic: initialState.statistic,
      }));
    }
    updateAnswersData(rightAnswers as Answer[], wrongAnswers as Answer[]);
    const sprintState = statistic.optional.sprint;

    const newStat: IStatistic = {
      learnedWords: statistic.learnedWords + learned.current,
      optional: {
        audiochallenge: {
          ...statistic.optional.audiochallenge,
        },
        sprint: {
          newWords: countNewWords([...rightAnswers, ...wrongAnswers]) + sprintState.newWords,
          correctAnswers: rightAnswers.length + sprintState.correctAnswers,
          wrongAnswers: wrongAnswers.length + sprintState.wrongAnswers,
          longestCombo: sprintState.longestCombo > maxCombo ? sprintState.longestCombo : maxCombo,
          gamesPlayed: sprintState.gamesPlayed + 1,
        },
        statisticDay: getToday(),
      },
    };
    dispatch(updateStatistic({
      userId: user.userId,
      token: user.token,
      statistic: newStat,
    }));
  };

  useEffect(() => {
    if (gameTime <= 0 || roundIndex >= words.length) {
      if (isLogged) {
        getNewStatistic();
      }
      setGameFinished(true);
    }
  }, [gameTime, roundIndex]);

  useEffect(() => {
    if (roundIndex < words.length) {
      dispatch(setCurrentWord(getRandomTranslate(words[roundIndex], randomWords)));
    }
  }, [roundIndex]);

  useEffect(() => {
    if (isLogged) {
      dispatch(fetchUserSettings(user));
      dispatch(fetchUserStatistic(user));
    }

    return function clearState() {
      dispatch(clearSprintState());
    };
  }, []);

  return (
    <section className="sprint">
      {
        !isGameFinished
          ? <SprintGameContainer time={gameTime} setTime={setGameTime} />
          : (
            <ResultGame
              rightWords={rightAnswers}
              wrongWords={wrongAnswers as unknown as Answer[]}
            />
          )
      }
      <div className="sprint__leave">
        <LeaveGameButton setVisible={setVisibleLeaveModal} />
        {
          isVisibleLeaveModal
          && (
          <ConfirmModal
            isVisible={isVisibleLeaveModal}
            setVisible={setVisibleLeaveModal}
          />
          )
        }
      </div>
    </section>
  );
};

export default Sprint;
