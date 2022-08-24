import { IWord } from '../interfaces/IWord';

export type PageData = {
  group: string;
  page: string;
};

export type WordsSourceType = 'group' | 'textbook' | undefined;
export type GameType = 'audiochallenge' | 'sprint' | undefined;
export type WordToTrain = Pick<IWord, 'id' | 'word' | 'image' | 'audio' | 'wordTranslate'>;

export type Answer = {
  answer: string;
  word: string;
  wordTranslate: string;
  audio: string;
  id: string;
};

export type RightAnswer = Pick<Answer, 'word' | 'wordTranslate' | 'audio' | 'id'>;
