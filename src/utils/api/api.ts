import ENV from '../../config/config';
import { IWord } from '../../interfaces/IWord';

// Words

export const fetchWordsByGroupAndPage = async (group: string, page: string) => {
  const response = await fetch(`${ENV.WORDS_URL}?group=${group}&page=${page}`);

  if (!response.ok) {
    throw new Error('Words are not found!');
  }

  const words: IWord[] = await response.json();

  return words;
};

export const fetchWordById = async (wordId: string) => {
  const response = await fetch(`${ENV.WORDS_URL}/${wordId}`);

  if (!response.ok) {
    throw new Error('Word is not found!');
  }

  const wordData: IWord = await response.json();

  return wordData;
};
