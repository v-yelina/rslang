import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordToTrain } from '../../types';

type RoundWord = Pick<WordToTrain, 'word' | 'wordTranslate'>;

type SprintGameState = {
  rightAnswers: WordToTrain[];
  wrongAnswers: WordToTrain[];
  currentWord: RoundWord;
  score: number;
  multiplier: number;
  roundIndex: number;
}

const initialState: SprintGameState = {
  rightAnswers: [],
  wrongAnswers: [],
  currentWord: {
    word: '',
    wordTranslate: '',
  },
  score: -10,
  multiplier: 0,
  roundIndex: 0,
};

export const sprintGameSlice = createSlice({
  name: 'sprintGame',
  initialState,
  reducers: {
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
    clearSprintState: () => initialState,
  },
  extraReducers: {},
});

export const {
  addRightAnswer,
  removeRightAnswer,
  addWrongAnswer,
  setCurrentWord,
  setGameScore,
  setMultiplier,
  setRoundIndex,
  clearSprintState,
} = sprintGameSlice.actions;

export default sprintGameSlice.reducer;
