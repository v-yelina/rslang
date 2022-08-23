import { createAsyncThunk } from '@reduxjs/toolkit';
import ENV from '../config/config';
import { ILogin } from '../interfaces/ILogin';
import { IUser } from '../interfaces/IUser';
import { PageData } from './types';

// eslint-disable-next-line
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
        throw new Error('User can\'t be created, please try again');
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
      const loginInfo = await response.json();
      return loginInfo;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  },
);
