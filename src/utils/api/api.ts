import ENV from '../../config/config';
import { IAuth } from '../../interfaces/IAuth';
import { ILogin } from '../../interfaces/ILogin';
import { ISettings } from '../../interfaces/ISettings';
import { IStatistic } from '../../interfaces/IStatistic';
import { IUser } from '../../interfaces/IUser';
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
      'Content-Type': 'application/json',
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
      'Content-Type': 'application/json',
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

// auth
export const createUser = async (userData: IUser) => {
  const response = await fetch(`${ENV.USERS_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }
  const authInfo: IUser = await response.json();
  return authInfo;
};

export const loginUser = async (loginData: ILogin) => {
  const response = await fetch(`${ENV.BASE_URL}signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  if (!response.ok || response.status !== 200) {
    throw new Error('Login failed, please try again');
  }
  const authInfo: IAuth = await response.json();
  const {
    userId, name, token, refreshToken,
  } = authInfo;
  return {
    userId,
    name,
    token,
    refreshToken,
  };
};

// statistics
export const getUserStatistic = async (userId: string, userToken: string) => {
  const response = await fetch(`${ENV.USERS_URL}/${userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      accept: 'application/json',
    },
  });

  if (!response.ok || response.status !== 200) {
    throw new Error('User statistics not found');
  }

  const userStatistics: IStatistic = await response.json();

  return userStatistics;
};

export const updateUserStatistic = async (
  userId: string,
  userToken: string,
  data: IStatistic,
) => {
  const response = await fetch(`${ENV.USERS_URL}/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${userToken}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok || response.status !== 200) {
    throw new Error('User statistic not updated');
  }

  const updatedStatistic: IStatistic = await response.json();

  return updatedStatistic;
};

// settings
export const getUserSettings = async (userId: string, userToken: string) => {
  const response = await fetch(`${ENV.USERS_URL}/${userId}/settings`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${userToken}`,
      accept: 'application/json',
    },
  });

  if (!response.ok || response.status !== 200) {
    throw new Error('User statistics not found');
  }

  const userSettings: ISettings = await response.json();

  return userSettings;
};

export const updateUserSettings = async (
  userId: string,
  userToken: string,
  data: ISettings,
) => {
  const response = await fetch(`${ENV.USERS_URL}/${userId}/settings`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${userToken}`,
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok || response.status !== 200) {
    throw new Error('User settings not updated');
  }

  const updatedSettings: ISettings = await response.json();

  return updatedSettings;
};
