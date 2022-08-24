import ENV from '../../config/config';
import { IUserWord } from '../../interfaces/IUserWord';
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

// UserWords

export const fetchUserWords = async (userId: string, userToken: string) => {
  const response = await fetch(`${ENV.USERS_URL}/${userId}/words`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('User words not found');
  }

  const userWords: IUserWord[] = await response.json();

  return userWords;
};

export const createUserWord = async (
  userId: string,
  userToken: string,
  wordId: string,
  userWord: IUserWord,
) => {
  const response = await fetch(`${ENV.USERS_URL}/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${userToken}`,
      accept: 'application/json',
    },
    body: JSON.stringify(userWord),
  });

  if (!response.ok || response.status !== 200) {
    throw new Error('User word not created');
  }

  const createdWord: IUserWord = await response.json();

  return createdWord;
};

export const fetchUserWordById = async (userId: string, userToken: string, wordId: string) => {
  const response = await fetch(`${ENV.USERS_URL}/${userId}/words/${wordId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      accept: 'application/json',
    },
  });

  if (!response.ok || response.status !== 200) {
    throw new Error('User word not found');
  }

  const userWord: IUserWord = await response.json();

  return userWord;
};

export const updateUserWord = async (
  userId: string,
  userToken: string,
  wordId: string,
  userWord: IUserWord,
) => {
  const response = await fetch(`${ENV.USERS_URL}/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${userToken}`,
      accept: 'application/json',
    },
    body: JSON.stringify(userWord),
  });

  if (!response.ok || response.status !== 200) {
    throw new Error('User word not updated');
  }

  const updatedWord: IUserWord = await response.json();

  return updatedWord;
};

export const deleteUserWord = async (userId: string, userToken: string, wordId: string) => {
  const response = await fetch(`${ENV.USERS_URL}/${userId}/words/${wordId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${userToken}`,
      accept: 'application/json',
    },
  });

  if (!response.ok || response.status !== 204) {
    throw new Error('User word not deleted');
  }
};
