import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../../interfaces/IWord';
import fetchWordsToSprintGame from './thunks';

type WordsSourceType = 'group' | 'textbook' | undefined;

type GameType = 'audiochallenge' | 'sprint' | undefined;

type WordToTrain = Pick<IWord, 'id' | 'word' | 'wordTranslate' | 'audio'>;
type RoundWord = Pick<WordToTrain, 'word' | 'wordTranslate'>;

type SprintGameState = {
  wordsSource: WordsSourceType;
  gameType: GameType;
  words: WordToTrain[];
  rightAnswers: WordToTrain[];
  wrongAnswers: WordToTrain[];
  currentWord: RoundWord;
  score: number;
  isLoading: boolean;
  roundIndex: number;
}

const initialState: SprintGameState = {
  wordsSource: undefined,
  gameType: 'sprint',
  words: [],
  rightAnswers: [],
  wrongAnswers: [],
  currentWord: {
    word: '',
    wordTranslate: '',
  },
  score: 0,
  isLoading: false,
  roundIndex: 0,
};

export const sprintGameSlice = createSlice({
  name: 'sprintGame',
  initialState,
  reducers: {
    setWordsSource: (state, action: PayloadAction<WordsSourceType>) => {
      state.wordsSource = action.payload;
    },
    setGameWords: (state, action: PayloadAction<IWord[]>) => {
      state.words = action.payload;
    },
    addRightAnswer: (state, action: PayloadAction<WordToTrain>) => {
      state.rightAnswers.push(action.payload);
    },
    addWrongAnswer: (state, action: PayloadAction<WordToTrain>) => {
      state.wrongAnswers.push(action.payload);
    },
    setCurrentRoundWord: (state, action: PayloadAction<RoundWord>) => {
      state.currentWord = action.payload;
    },
    setGameScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    setRoundIndex: (state, action: PayloadAction<number>) => {
      state.roundIndex = action.payload;
    },
    clearCurrentGame: () => initialState,
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
  setWordsSource,
  setGameWords,
  addRightAnswer,
  addWrongAnswer,
  setCurrentRoundWord,
  setGameScore,
  setRoundIndex,
  clearCurrentGame,
} = sprintGameSlice.actions;

export default sprintGameSlice.reducer;
