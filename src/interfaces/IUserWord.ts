import { DifficultyType } from '../store/types';

export interface IUserWord {
  difficulty: DifficultyType;
  optional: {
    isLearned: boolean;
    isNew: boolean;
    // для выставления признака изученного слова,
    // инкремент при правильном ответе, обнуление при неправильном
    rightAnswersCounter: number;
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
