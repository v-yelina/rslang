import { createAsyncThunk } from '@reduxjs/toolkit';
import ENV from '../config/config';
import { IAuth } from '../interfaces/IAuth';
import { ILogin } from '../interfaces/ILogin';
import { IUser } from '../interfaces/IUser';
import { IWord } from '../interfaces/IWord';
import { PageData } from './types';

export const fetchWordsByGroupAndPage = createAsyncThunk(
  'textbook/fetchWords',
  async (pageData: PageData, thunkAPI) => {
    try {
      const response = await fetch(
        `${ENV.BASE_URL}words?group=${pageData.group}&page=${pageData.page}`,
      );

      if (!response.ok) {
        throw new Error('Words are not found');
      }

      const words = await response.json();
      return words;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const registration = createAsyncThunk(
  'user/register',
  async (userData: IUser, thunkAPI) => {
    try {
      const response = await fetch(`${ENV.BASE_URL}users`, {
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
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const login = createAsyncThunk(
  'user/login',
  async (loginData: ILogin, thunkAPI) => {
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
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);

export const fetchWordsToSprintGame = createAsyncThunk(
  'sprintGame/fetchWords',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${ENV.BASE_URL}words?group=0&page=0`);

      if (!response.ok) {
        throw new Error('Words are not found, Server error!');
      }

      const words: IWord[] = await response.json();

      return words.map((item) => ({
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
