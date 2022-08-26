import { IUserWord } from '../../interfaces/IUserWord';

export const formatPageDataForSlice = (data: string): string => (Number(data) - 1).toString();
export const formatPageDataForUI = (data: string): string => (Number(data) + 1).toString();

export const checkSearchParamsCorrect = (group: string | null, page: string | null) =>
  // eslint-disable-next-line
  group && page && Number(group) > 0 && Number(page) > 0 && Number(group) < 7 && Number(page) < 31;

export const prepareNewLearnedWord = (): IUserWord => ({
  difficulty: 'easy',
  optional: {
    isLearned: true,
    isNew: true,
    rightAnswersCounter: 0,
    sprint: {
      rightCounter: 0,
      wrongCounter: 0,
    },
    audiochallenge: {
      rightCounter: 0,
      wrongCounter: 0,
    },
  },
});

export const updateLearnedWord = (userWord: IUserWord): IUserWord => {
  const newLearnedValue = !userWord.optional.isLearned;
  const newRightAnswersCounter = newLearnedValue ? userWord.optional.rightAnswersCounter : 0;
  const newOptional = {
    ...userWord.optional,
    isLearned: newLearnedValue,
    rightAnswersCounter: newRightAnswersCounter,
  };
  return { difficulty: userWord.difficulty, optional: newOptional };
};

export const prepareNewDifficultWord = (): IUserWord => ({
  difficulty: 'difficult',
  optional: {
    isLearned: false,
    rightAnswersCounter: 0,
  },
});

export const updateDifficultWord = (userWord: IUserWord): IUserWord => {
  const newDifficulty = userWord.difficulty === 'easy' ? 'difficult' : 'easy';
  return { difficulty: newDifficulty, optional: { ...userWord.optional } };
};
