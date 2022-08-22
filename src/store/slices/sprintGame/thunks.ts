import { createAsyncThunk } from '@reduxjs/toolkit';
import ENV from '../../../config/config';
import { IWord } from '../../../interfaces/IWord';

const fetchWordsToSprintGame = createAsyncThunk(
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

export default fetchWordsToSprintGame;
