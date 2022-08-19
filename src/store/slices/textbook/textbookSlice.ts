import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../../interfaces/IWord';

export type TextbookState = {
  currentWords: IWord[];
};

const initialState: TextbookState = {
  currentWords: [],
};

export const textbookSlice = createSlice({
  name: 'textbook',
  initialState,
  reducers: {
    setCurrentWords: (state, action: PayloadAction<IWord[]>) => {
      state.currentWords = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { setCurrentWords } = textbookSlice.actions;

export default textbookSlice.reducer;
