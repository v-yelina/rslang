import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../../interfaces/IWord';
import { fetchWordsByGroupAndPage } from '../../thunks';
import { PageData } from '../../types';

export type TextbookState = {
  currentWords: IWord[];
  // currentWordsRequestId: string | undefined;
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
    [fetchWordsByGroupAndPage.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [fetchWordsByGroupAndPage.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.currentWords = action.payload;
    },
    [fetchWordsByGroupAndPage.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { setCurrentPageData, clearCurrentWords } = textbookSlice.actions;

export default textbookSlice.reducer;
