import { createAsyncThunk } from '@reduxjs/toolkit';
import ENV from '../config/config';
import { PageData } from './types';

export const fetchWordsByGroupAndPage = createAsyncThunk(
  'textbook/fetchWords',
  async (pageData: PageData, thunkAPI) => {
    try {
      const response = await fetch(
        `${ENV.BASE_URL}words?group=${pageData.group}&page=${pageData.page}`
      );

      if (!response.ok) {
        throw new Error('Words are not found');
      }

      const words = await response.json();
      return words;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    }
  }
);
