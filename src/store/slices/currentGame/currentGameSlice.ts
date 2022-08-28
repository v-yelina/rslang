import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../../interfaces/IWord';
import { fetchWordsForGame } from '../../thunks';
import { PageData } from '../../types';

type wordsSourceType = 'group' | 'textbook' | undefined;

export type gameType = 'audiochallenge' | 'sprint' | undefined;

export type WordToTrain = Pick<IWord, 'id' | 'word' | 'image' | 'audio' | 'wordTranslate'>;
export type Answer = {
  answer: string;
  word: string;
  wordTranslate: string;
  audio: string;
  id: string;
};
export type RightAnswer = Pick<Answer, 'word' | 'wordTranslate' | 'audio' | 'id'>;

type CurrentGameState = {
  wordsSource: wordsSourceType;
  gameType: gameType;
  words: WordToTrain[];
  rightAnswers: RightAnswer[];
  wrongAnswers: Answer[];
  maxCombo: number;
  currentPageData: PageData;
  isLoading: boolean;
  steps: number;
};

const initialState: CurrentGameState = {
  wordsSource: undefined,
  gameType: undefined,
  words: [],
  rightAnswers: [],
  wrongAnswers: [],
  maxCombo: 0,
  currentPageData: {
    group: '',
    page: '',
  },
  isLoading: false,
  steps: 0,
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
    addRightAnswer: (state, action: PayloadAction<RightAnswer>) => {
      state.rightAnswers.push(action.payload);
    },
    addWrongAnswer: (state, action: PayloadAction<Answer>) => {
      state.wrongAnswers.push(action.payload);
    },
    changeCombo: (state, action: PayloadAction<number>) => {
      state.maxCombo = action.payload;
    },
    setCurrentGamePage: (state, action: PayloadAction<PageData>) => {
      state.currentPageData = action.payload;
    },
    clearCurrentGame: () => initialState,
  },
  extraReducers: {
    [fetchWordsForGame.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchWordsForGame.fulfilled.type]: (state, action: PayloadAction<WordToTrain[]>) => {
      state.isLoading = false;
      state.words = [
        ...state.words,
        ...action.payload,
      ];
      state.steps += 1;
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
} = currentGameSlice.actions;

export default currentGameSlice.reducer;
