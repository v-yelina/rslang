import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserWord } from '../../../interfaces/IUserWord';
import { IWord } from '../../../interfaces/IWord';
import { fetchWordsForTextbook } from '../../thunks';
import { PageData } from '../../types';

export interface AggregatedWord extends IWord {
  userWord: IUserWord | null;
}

export type TextbookState = {
  currentWords: AggregatedWord[];
  currentPageData: PageData;
  isLoading: boolean;
  error: string | null;
};

const initialState: TextbookState = {
  currentWords: [],
  currentPageData: { group: '', page: '' },
  isLoading: false,
  error: null,
};

export const textbookSlice = createSlice({
  name: 'textbook',
  initialState,
  reducers: {
    setCurrentPageData: (state, action: PayloadAction<PageData>) => {
      state.currentPageData = action.payload;
    },
    clearCurrentWords: (state) => {
      state.currentWords = [];
    },
  },
  extraReducers: {
    [fetchWordsForTextbook.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchWordsForTextbook.fulfilled.type]: (state, action: PayloadAction<AggregatedWord[]>) => {
      state.isLoading = false;
      state.currentWords = action.payload;
    },
    [fetchWordsForTextbook.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setCurrentPageData, clearCurrentWords } = textbookSlice.actions;

export default textbookSlice.reducer;
