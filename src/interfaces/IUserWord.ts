import { DifficultyType } from '../store/types';

export interface IUserWord {
  difficulty: DifficultyType;
  optional: {
    isLearned: boolean;
    isNew: boolean;
    rightAnswersCounter: number; // для выставления признака изученного слова, инкремент при правильном ответе, обнуление при неправильном
    sprint: {
      rightCounter: number;
      wrongCounter: number;
    };
    audiochallenge: {
      rightCounter: number;
      wrongCounter: number;
    };
  };
  wordId?: string;
}
