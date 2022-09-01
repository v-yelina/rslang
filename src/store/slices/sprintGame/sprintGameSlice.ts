import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WordToTrain } from '../../types';

type RoundWord = Pick<WordToTrain, 'word' | 'wordTranslate' | 'id'>;

type SprintGameState = {
  rightAnswers: WordToTrain[];
  wrongAnswers: WordToTrain[];
  currentWord: RoundWord;
  score: number;
  counter: number;
  multiplier: number;
  roundIndex: number;
  isRightAnswer: boolean;
}

const initialState: SprintGameState = {
  rightAnswers: [],
  wrongAnswers: [],
  currentWord: {
    word: '',
    wordTranslate: '',
    id: '',
  },
  score: 0,
  counter: 0,
  multiplier: 0,
  roundIndex: 0,
  isRightAnswer: false,
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
    setCounter: (state, action: PayloadAction<number>) => {
      state.counter = action.payload;
    },
    setMultiplier: (state, action: PayloadAction<number>) => {
      state.multiplier = action.payload;
    },
    setRoundIndex: (state, action: PayloadAction<number>) => {
      state.roundIndex = action.payload;
    },
    setIsRightAnswer: (state, action: PayloadAction<boolean>) => {
      state.isRightAnswer = action.payload;
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
  setCounter,
  setMultiplier,
  setRoundIndex,
  setIsRightAnswer,
  clearSprintState,
} = sprintGameSlice.actions;

export default sprintGameSlice.reducer;
