import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../../interfaces/IWord';
import { fetchWordsToSprintGame } from '../../thunks';
import { WordToTrain } from '../../types';

type RoundWord = Pick<WordToTrain, 'word' | 'wordTranslate'>;

type SprintGameState = {
  words: WordToTrain[];
  rightAnswers: WordToTrain[];
  wrongAnswers: WordToTrain[];
  currentWord: RoundWord;
  score: number;
  multiplier: number;
  isLoading: boolean;
  roundIndex: number;
  roundDuration: number;
}

const initialState: SprintGameState = {
  words: [],
  rightAnswers: [],
  wrongAnswers: [],
  currentWord: {
    word: '',
    wordTranslate: '',
  },
  score: -10,
  multiplier: 0,
  isLoading: true,
  roundIndex: 0,
  roundDuration: 0,
};

export const sprintGameSlice = createSlice({
  name: 'sprintGame',
  initialState,
  reducers: {
    setGameWords: (state, action: PayloadAction<IWord[]>) => {
      state.words = action.payload;
    },
    addRightAnswer: (state, action: PayloadAction<WordToTrain>) => {
      state.rightAnswers.push(action.payload);
    },
    removeRightAnswer: (state, action: PayloadAction<WordToTrain>) => {
      state.rightAnswers = state.rightAnswers.filter((item) => item.word !== action.payload.word);
    },
    addWrongAnswer: (state, action: PayloadAction<WordToTrain>) => {
      state.wrongAnswers.push(action.payload);
    },
    setCurrentWord: (state, action: PayloadAction<RoundWord>) => {
      state.currentWord = action.payload;
    },
    setGameScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setMultiplier: (state, action: PayloadAction<number>) => {
      state.multiplier = action.payload;
    },
    setRoundIndex: (state, action: PayloadAction<number>) => {
      state.roundIndex = action.payload;
    },
    setRoundDuration: (state, action: PayloadAction<number>) => {
      state.roundDuration = action.payload;
    },
    clearSprintState: () => initialState,
  },
  extraReducers: {
    [fetchWordsToSprintGame.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchWordsToSprintGame.fulfilled.type]: (state, action: PayloadAction<WordToTrain[]>) => {
      state.isLoading = false;
      state.words = action.payload;
    },
  },
});

export const {
  setGameWords,
  addRightAnswer,
  removeRightAnswer,
  addWrongAnswer,
  setCurrentWord,
  setGameScore,
  setMultiplier,
  setRoundIndex,
  setRoundDuration,
  clearSprintState,
} = sprintGameSlice.actions;

export default sprintGameSlice.reducer;
