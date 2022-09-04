import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchRandomWordsForGame, fetchWordsForGame } from '../../thunks';
import { IUserWord } from '../../../interfaces/IUserWord';
import { IWord } from '../../../interfaces/IWord';

type wordsSourceType = 'group' | 'textbook' | undefined;

export type gameType = 'audiochallenge' | 'sprint' | undefined;

export type WordToTrain = Pick<IWord, 'id' | 'word' | 'image' | 'audio' | 'wordTranslate'> & (Partial<IUserWord> & Pick<IUserWord, 'difficulty' | 'optional'>);

export interface Answer extends WordToTrain {
  answer: string;
}

type CurrentGameState = {
  wordsSource: wordsSourceType;
  gameType: gameType;
  words: WordToTrain[];
  randomWords: WordToTrain[];
  rightAnswers: Answer[];
  wrongAnswers: Answer[];
  maxCombo: number;
  isLoading: boolean;
  fulfilledCount: number;
  pendingCount: number;
};

const initialState: CurrentGameState = {
  wordsSource: undefined,
  gameType: undefined,
  words: [],
  randomWords: [],
  rightAnswers: [],
  wrongAnswers: [],
  maxCombo: 0,
  isLoading: false,
  fulfilledCount: 0,
  pendingCount: 0,
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
    setRandomWords: (state, action: PayloadAction<WordToTrain[]>) => {
      state.randomWords = [
        ...state.randomWords,
        ...action.payload,
      ];
    },
    addRightAnswer: (state, action: PayloadAction<Answer>) => {
      state.rightAnswers.push(action.payload);
    },
    addWrongAnswer: (state, action: PayloadAction<Answer>) => {
      state.wrongAnswers.push(action.payload);
    },
    changeCombo: (state, action: PayloadAction<number>) => {
      state.maxCombo = action.payload;
    },
    clearCurrentGame: () => initialState,
  },
  extraReducers: {
    [fetchWordsForGame.pending.type]: (state) => {
      state.isLoading = true;
      state.pendingCount += 1;
    },
    [fetchWordsForGame.fulfilled.type]: (state, action: PayloadAction<WordToTrain[]>) => {
      state.isLoading = false;
      state.words = [
        ...state.words,
        ...action.payload,
      ];
      state.fulfilledCount += 1;
    },
    [fetchRandomWordsForGame.pending.type]: (state) => {
      state.pendingCount += 1;
    },
    [fetchRandomWordsForGame.fulfilled.type]: (state, action: PayloadAction<WordToTrain[]>) => {
      state.isLoading = false;
      state.randomWords = action.payload;
      state.fulfilledCount += 1;
    },
  },
});

export const {
  setGameType,
  setWordsSource,
  setWordsToTrain,
  clearCurrentGame,
  addRightAnswer,
  addWrongAnswer,
  changeCombo,
  setRandomWords,
} = currentGameSlice.actions;

export default currentGameSlice.reducer;
