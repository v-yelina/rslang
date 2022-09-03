import { createAsyncThunk } from '@reduxjs/toolkit';
import ENV from '../config/config';
import { ILogin } from '../interfaces/ILogin';
import { IUser } from '../interfaces/IUser';
import { IUserWord } from '../interfaces/IUserWord';
import { AggregatedWord, IWord } from '../interfaces/IWord';
import {
  createUserWord,
  fetchUserWords,
  fetchWordById,
  fetchWordsByGroupAndPage,
  getUserSettings,
  getUserStatistic,
  updateUserSettings,
  updateUserStatistic,
  updateUserWord,
} from '../utils/api';
import {
  WordDataForUpdate,
  PageUserData,
  IStatisticDataForUpdate,
  IUserData,
  ISettingsDataForUpdate,
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

export const fetchDifficultWordsForTextbook = createAsyncThunk(
  'textbook/fetchDifficultWords',
  async (userData: IUserData, { rejectWithValue }) => {
    const { userId, token } = userData;
    try {
      const userWords = await fetchUserWords(userId, token);
      const difficultWords = userWords.filter((userWord) => userWord.difficulty === 'difficult');
      const wordRequests = difficultWords.map((item) => fetchWordById(item.wordId!));
      // eslint-disable-next-line
      const wordsPayload: AggregatedWord[] = await Promise.allSettled(wordRequests).then(
        (results) => {
          const newWords: IWord[] = [];
          results.forEach((result) => {
            if (result.status === 'fulfilled') {
              newWords.push(result.value as IWord);
            }
          });
          return [...newWords].map((item) => ({
            ...item,
            userWord: difficultWords.find((word) => word.wordId! === item!.id)!,
          }));
        },
      );
      return wordsPayload;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const registration = createAsyncThunk(
  'user/register',
  async (userData: IUser, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ENV.BASE_URL}users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('User can\'t be created, please try again');
      }
      const authInfo = await response.json();
      return authInfo;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (loginData: ILogin, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ENV.BASE_URL}signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Login failed, please try again');
      }
      const loginInfo = await response.json();
      return loginInfo;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchWordsForGame = createAsyncThunk(
  'currentGame/fetchWords',
  async (pageData: PageUserData, { rejectWithValue }) => {
    const { group, page, user } = pageData;
    try {
      const words = await fetchWordsByGroupAndPage(group, page);

      if (user) {
        const { userId, token } = user;
        const userWords: IUserWord[] = await fetchUserWords(userId, token);

        const aggregatedWord: AggregatedWord[] = words.map((item) => {
          const newUserWord = userWords.find((el) => el.wordId === item.id);

          return { ...item, userWord: newUserWord || null };
        });

        return aggregatedWord
          .filter((item) => item.userWord === null || !item.userWord.optional.isLearned)
          .map((item) => ({
            id: item.id,
            word: item.word,
            wordTranslate: item.wordTranslate,
            audio: item.audio,
            image: item.image,
          }));
      }

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

export const fetchRandomWordsForGame = createAsyncThunk(
  'currentGame/fetchRandomWords',
  async (pageData: PageUserData, { rejectWithValue }) => {
    const { group } = pageData;
    const pages: string[] = [];
    const words: IWord[] = [];

    for (let i = 0; i < 3; i += 1) {
      const randomPage = (Math.random() * 30).toString();
      if (!pages.includes(randomPage)) {
        pages.push(randomPage);
      } else {
        i -= 1;
      }
    }

    try {
      const promises = pages.map((randomPage) => fetchWordsByGroupAndPage(group, randomPage));
      await Promise.all(promises)
        .then((res) => res.map((item) => words.push(...item)));

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
  async (user: IUserData, { rejectWithValue }) => {
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
    const { userId, token, statistic } = statisticData;
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
  async (user: IUserData, { rejectWithValue }) => {
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
    const { userId, token, settings } = settingsData;
    try {
      const updatedSettings = await updateUserSettings(userId, token, settings);
      return updatedSettings;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
