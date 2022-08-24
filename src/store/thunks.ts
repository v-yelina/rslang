import { createAsyncThunk } from '@reduxjs/toolkit';
import ENV from '../config/config';
import { IAuth } from '../interfaces/IAuth';
import { ILogin } from '../interfaces/ILogin';
import { IUser } from '../interfaces/IUser';
import { IWord } from '../interfaces/IWord';
import { fetchWordsByGroupAndPage } from '../utils/api/api';
import { PageData } from './types';

export const fetchWordsForTextbook = createAsyncThunk(
  'textbook/fetchWords',
  async (pageData: PageData, { rejectWithValue }) => {
    const { group, page } = pageData;
    try {
      const words = await fetchWordsByGroupAndPage(group, page);
      return words;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const registration = createAsyncThunk(
  'user/register',
  async (userData: IUser, { rejectWithValue }) => {
    try {
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
      const authInfo:IAuth = await response.json();
      const {
        userId, name, token, refreshToken,
      } = authInfo;
      return {
        userId, name, token, refreshToken,
      };
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  },
);

export const fetchWordsToSprintGame = createAsyncThunk(
  'sprintGame/fetchWords',
  async (_, { rejectWithValue }) => {
    try {
      const words = await fetchWordsByGroupAndPage('0', '0');

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
