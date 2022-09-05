import { ISettings } from '../interfaces/ISettings';
import { IStatistic } from '../interfaces/IStatistic';
import { IUserWord } from '../interfaces/IUserWord';
import { IWord } from '../interfaces/IWord';

export type PageData = {
  group: string;
  page: string;
};

export interface IUserData {
  userId: string;
  token: string;
}

export type PageUserData = {
  group: string;
  page: string;
  user: IUserData | null;
};

export type WordDataForUpdate = {
  userId: string;
  token: string;
  wordId: string;
  userWord: IUserWord;
};

export interface IStatisticDataForUpdate extends IUserData {
  statistic: IStatistic;
}

export interface ISettingsDataForUpdate extends IUserData {
  settings: ISettings;
}

export type WordsSourceType = 'group' | 'textbook' | undefined;
export type GameType = 'audiochallenge' | 'sprint' | undefined;
export type WordToTrain = Pick<IWord, 'id' | 'word' | 'image' | 'audio' | 'wordTranslate'> & (Partial<IUserWord> & Pick<IUserWord, 'difficulty' | 'optional'>);

export interface Answer extends WordToTrain {
  answer: string;
}

export type RightAnswer = Pick<Answer, 'word' | 'wordTranslate' | 'audio' | 'id'>;

export type DifficultyType = 'easy' | 'difficult';
