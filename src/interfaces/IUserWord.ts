export interface IUserWord {
  difficulty: string;
  optional: {
    isLearned: boolean;
    rightAnswersCounter: number;
  };
}
