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
  loginUser,
  updateUserWord,
} from '../utils/api';
import { WordDataForUpdate, PageUserData } from './types';

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
