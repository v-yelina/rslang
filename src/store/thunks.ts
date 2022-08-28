import { createAsyncThunk } from '@reduxjs/toolkit';
import { ILogin } from '../interfaces/ILogin';
import { IUser } from '../interfaces/IUser';
import { IUserWord } from '../interfaces/IUserWord';
import { IWord } from '../interfaces/IWord';
import {
  createUser,
  createUserWord,
  fetchUserWords,
  fetchWordsByGroupAndPage,
  getUserSettings,
  getUserStatistic,
  loginUser,
  updateUserSettings,
  updateUserStatistic,
  updateUserWord,
} from '../utils/api';
import {
  WordDataForUpdate, PageUserData, IStatisticDataForUpdate, IUserData, ISettingsDataForUpdate,
} from './types';

export const fetchWordsForTextbook = createAsyncThunk(
  'textbook/fetchWords',
  async (pageData: PageUserData, { rejectWithValue }) => {
    const { user, group, page } = pageData;
    try {
      const words = await fetchWordsByGroupAndPage(group, page);
      if (user) {
        const { userId, token } = user;
        const userWords: IUserWord[] = await fetchUserWords(userId, token);
        return words.map((item) => {
          const newUserWord = userWords.find((elem) => elem.wordId === item.id);
          return { ...item, userWord: newUserWord || null };
        });
      }
      return words.map((item) => ({ ...item, userWord: null }));
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const registration = createAsyncThunk(
  'user/register',
  async (userData: IUser, { rejectWithValue }) => {
    try {
      return createUser(userData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (loginData: ILogin, { rejectWithValue }) => {
    try {
      return loginUser(loginData);
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchWordsForGame = createAsyncThunk(
  'currentGame/fetchWords',
  async (pageData: PageUserData, { rejectWithValue }) => {
    const { group, page } = pageData;
    try {
      const words = await fetchWordsByGroupAndPage(group, page);

      return words.map((item: IWord) => ({
        id: item.id,
        word: item.word,
        wordTranslate: item.wordTranslate,
        audio: item.audio,
        image: item.image,
      }));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createUserWordFromTextbook = createAsyncThunk(
  'textbook/createUserWord',
  async (wordData: WordDataForUpdate, { rejectWithValue }) => {
    const {
      userId, token, wordId, userWord,
    } = wordData;
    try {
      return await createUserWord(userId, token, wordId, userWord);
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateUserWordFromTextbook = createAsyncThunk(
  'textbook/updateUserWord',
  async (wordData: WordDataForUpdate, { rejectWithValue }) => {
    const {
      userId, token, wordId, userWord,
    } = wordData;
    try {
      const updatedWord = await updateUserWord(userId, token, wordId, userWord);
      return updatedWord;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchUserStatistic = createAsyncThunk(
  'statistic/updateUserStatistic',
  async (user:IUserData, { rejectWithValue }) => {
    try {
      const { userId, token } = user;
      const statistic = await getUserStatistic(userId, token);

      return statistic;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateStatistic = createAsyncThunk(
  'statistic/updateUserStatistic',
  async (statisticData: IStatisticDataForUpdate, { rejectWithValue }) => {
    const {
      userId, token, statistic,
    } = statisticData;
    try {
      const updatedStatistic = await updateUserStatistic(userId, token, statistic);
      return updatedStatistic;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const fetchUserSettings = createAsyncThunk(
  'statistic/updateUserSettings',
  async (user:IUserData, { rejectWithValue }) => {
    try {
      const { userId, token } = user;
      const settings = await getUserSettings(userId, token);

      return settings;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateSettings = createAsyncThunk(
  'statistic/updateUserSettings',
  async (settingsData: ISettingsDataForUpdate, { rejectWithValue }) => {
    const {
      userId, token, settings,
    } = settingsData;
    try {
      const updatedSettings = await updateUserSettings(userId, token, settings);
      return updatedSettings;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
