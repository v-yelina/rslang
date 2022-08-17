import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../../interfaces/IWord';

type wordsSourceType = 'group' | 'textbook' | undefined;

type gameType = 'audiochallenge' | 'sprint' | undefined;

interface WordToTrain extends Pick<IWord, 'id' | 'word' | 'image' | 'audio' | 'wordTranslate'> {
  answer: string;
}

export type CurrentGameState = {
  wordsSource: wordsSourceType;
  gameType: gameType;
  words: WordToTrain[];
};

const initialState: CurrentGameState = {
  wordsSource: undefined,
  gameType: undefined,
  words: [],
};

export const currentGameSlice = createSlice({
  name: 'currentGame',
  initialState,
  reducers: {
    setWordsSource: (state, action: PayloadAction<wordsSourceType>) => {
      state.wordsSource = action.payload;
    },
    setGameType: (state, action: PayloadAction<gameType>) => {
      state.gameType = action.payload;
    },
    setWordsToTrain: (state, action: PayloadAction<WordToTrain[]>) => {
      state.words = action.payload;
    },

    clearCurrentgame: () => initialState,
  },
  extraReducers: () => {},
});

export const {
  setGameType, setWordsSource, setWordsToTrain, clearCurrentgame,
} = currentGameSlice.actions;

export default currentGameSlice.reducer;
