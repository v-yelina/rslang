import { createAsyncThunk } from '@reduxjs/toolkit';
// import ENV from '../../../config/config';
import { IWord } from '../../../interfaces/IWord';

const fetchWordsToSprintGame = createAsyncThunk(
  'sprintGame/fetchWords',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://rlang-app.herokuapp.com/words?_group=0&_page=0');

      if (!response.ok) {
        throw new Error('Words are not found, Server error!');
      }

      const words: IWord[] = await response.json();

      return words;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export default fetchWordsToSprintGame;
