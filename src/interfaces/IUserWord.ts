import { DifficultyType } from '../store/types';

export interface IUserWord {
  difficulty: DifficultyType;
  optional: {
    isLearned: boolean;
    rightAnswersCounter: number;
  };
  wordId?: string;
}
