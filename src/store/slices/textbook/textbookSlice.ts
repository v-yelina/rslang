import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../../interfaces/IWord';
import { fetchWordsByGroupAndPage } from '../../thunks';

export type TextbookState = {
  currentWords: IWord[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TextbookState = {
  currentWords: [],
  isLoading: false,
  error: null,
};

export const textbookSlice = createSlice({
  name: 'textbook',
  initialState,
  reducers: {
    setCurrentWords: (state, action: PayloadAction<IWord[]>) => {
      state.currentWords = action.payload;
    },
  },
  extraReducers: {
    [fetchWordsByGroupAndPage.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchWordsByGroupAndPage.fulfilled.type]: (state, action: PayloadAction<IWord[]>) => {
      state.isLoading = false;
      state.currentWords = action.payload;
    },
    [fetchWordsByGroupAndPage.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setCurrentWords } = textbookSlice.actions;

export default textbookSlice.reducer;
