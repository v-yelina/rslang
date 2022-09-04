import { IStatistic } from '../../interfaces/IStatistic';
import { IUserWord } from '../../interfaces/IUserWord';
import { gameType } from '../../store/slices/currentGame';
import { WordToTrain } from '../../store/types';
import { addAnswersToSliceArgs } from '../audiochallenge/Audiochallenge';

type UpdateWordType = {newLearned: boolean; newStatistic:IUserWord}

export const getToday = () => new Date().toJSON().slice(0, 10);

export const checkDate = (statDate:string, today: string) => statDate === today;

export const countNewWords = (data: WordToTrain[]) => data.filter((item) => !item.optional).length;

export const getNewDayStat = (dayStat: IStatistic) => {
  const day = dayStat.optional.statisticDay;
  const newWordsCount = dayStat.optional.audiochallenge.newWords
  + dayStat.optional.sprint.newWords;
  const gamesCount = dayStat.optional.audiochallenge.gamesPlayed
  + dayStat.optional.sprint.gamesPlayed;
  return { day, newWordsCount, gamesCount };
};

const updateGamesStat = (
  game:gameType,
  data: addAnswersToSliceArgs,
) => {
  const gamesStat = data.answer.optional ? {
    sprint: { ...data.answer.optional.sprint },
    audiochallenge: { ...data.answer.optional.audiochallenge },
  } : {
    audiochallenge: {
      rightCounter: 0,
      wrongCounter: 0,
    },
    sprint: {
      rightCounter: 0,
      wrongCounter: 0,
    },
  };
  if (game === 'audiochallenge' && data.isRight) {
    gamesStat.audiochallenge.rightCounter += 1;
  }
  if (game === 'audiochallenge' && !data.isRight) {
    gamesStat.audiochallenge.wrongCounter += 1;
  }
  if (game === 'sprint' && data.isRight) {
    gamesStat.sprint.rightCounter += 1;
  }
  if (game === 'sprint' && !data.isRight) {
    gamesStat.sprint.wrongCounter += 1;
  }
  return gamesStat;
};

const checkIfLearned = (counter: number, isDifficult: boolean) => {
  if (counter >= 3 && !isDifficult) {
    return true;
  }
  if (counter >= 5 && isDifficult) {
    return true;
  }
  return false;
};

export const updateWord = (data: addAnswersToSliceArgs, game: gameType):UpdateWordType => {
  const wasLearned = data.answer.optional
    ? data.answer.optional.isLearned : false;
  const gamesStat = updateGamesStat(game, data);
  let newRightAnswersCounter;
  if (data.isRight) {
    newRightAnswersCounter = data.answer.optional
      ? data.answer.optional.rightAnswersCounter + 1 : 1;
  } else {
    newRightAnswersCounter = 0;
  }
  const isLearned = checkIfLearned(newRightAnswersCounter, data.answer.difficulty === 'difficult');
  const newLearned = isLearned && !wasLearned;
  return {
    newLearned,
    newStatistic: {
      difficulty: data.answer.difficulty,
      optional: {
        isLearned, isNew: false, rightAnswersCounter: newRightAnswersCounter, ...gamesStat,
      },
    },
  };
};
