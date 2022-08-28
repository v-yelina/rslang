import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AggregatedWord } from '../../../interfaces/IWord';
import {
  createUserWordFromTextbook,
  fetchDifficultWordsForTextbook,
  fetchWordsForTextbook,
  updateUserWordFromTextbook,
} from '../../thunks';
import { PageData } from '../../types';

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
    [createUserWordFromTextbook.fulfilled.type]: (state) => {
      const pageData = { ...state.currentPageData };
      state.currentPageData = pageData;
    },
    [updateUserWordFromTextbook.fulfilled.type]: (state) => {
      const pageData = { ...state.currentPageData };
      state.currentPageData = pageData;
    },
    [fetchDifficultWordsForTextbook.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchDifficultWordsForTextbook.fulfilled.type]: (
      state,
      action: PayloadAction<AggregatedWord[]>,
    ) => {
      state.isLoading = false;
      state.currentWords = action.payload;
    },
    [fetchDifficultWordsForTextbook.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setCurrentPageData, clearCurrentWords } = textbookSlice.actions;

export default textbookSlice.reducer;
