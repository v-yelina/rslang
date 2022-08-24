import { DifficultyType } from '../store/types';

export interface IUserWord {
  difficulty: DifficultyType;
  optional: {
    wordId: string;
    isLearned: boolean;
    rightAnswersCounter: number;
  };
}
