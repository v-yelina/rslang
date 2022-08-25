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
    rightAnswersCounter: 0,
  },
});

export const updateLearnedWord = (userWord: IUserWord): IUserWord => {
  const newOptional = { ...userWord.optional, isLearned: !userWord.optional.isLearned };
  return { difficulty: userWord.difficulty, optional: newOptional };
};
