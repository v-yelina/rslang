import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../../interfaces/IWord';
import fetchWordsToSprintGame from './thunks';

type WordsSourceType = 'group' | 'textbook' | undefined;

type GameType = 'audiochallenge' | 'sprint' | undefined;

type WordToGame = Pick<IWord, 'id' | 'word' | 'wordTranslate' | 'audio'>;
type RoundWord = WordToGame | undefined;

type SprintGameState = {
  wordsSource: WordsSourceType;
  gameType: GameType;
  words: WordToGame[];
  rightAnswers: WordToGame[];
  wrongAnswers: WordToGame[];
  currentWord: RoundWord;
  score: number;
  isLoading: boolean;
}

const initialState: SprintGameState = {
  wordsSource: undefined,
  gameType: 'sprint',
  words: [],
  rightAnswers: [],
  wrongAnswers: [],
  currentWord: undefined,
  score: 0,
  isLoading: false,
};

export const sprintGameSlice = createSlice({
  name: 'sprintGame',
  initialState,
  reducers: {
    setWordsSource: (state, action: PayloadAction<WordsSourceType>) => {
      state.wordsSource = action.payload;
    },
    addRightAnswer: (state, action: PayloadAction<WordToGame>) => {
      state.rightAnswers.push(action.payload);
    },
    addWrongAnswer: (state, action: PayloadAction<WordToGame>) => {
      state.wrongAnswers.push(action.payload);
    },
    setCurrentRoundWord: (state, action: PayloadAction<RoundWord>) => {
      state.currentWord = action.payload;
    },
    setGameScore: (state, action: PayloadAction<number>) => {
      state.score = action.payload;
    },
    clearCurrentGame: () => initialState,
  },
  extraReducers: {
    [fetchWordsToSprintGame.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchWordsToSprintGame.fulfilled.type]: (state, action: PayloadAction<WordToGame[]>) => {
      state.isLoading = false;
      state.words = action.payload;
    },
  },
});

export const {
  setWordsSource,
  addRightAnswer,
  addWrongAnswer,
  setCurrentRoundWord,
  setGameScore,
  clearCurrentGame,
} = sprintGameSlice.actions;

export default sprintGameSlice.reducer;
