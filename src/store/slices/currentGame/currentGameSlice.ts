import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../../interfaces/IWord';

type wordsSourceType = 'group' | 'textbook' | undefined;

type gameType = 'audiochallenge' | 'sprint' | undefined;

type WordToTrain = Pick<IWord, 'id' | 'word' | 'image' | 'audio' | 'wordTranslate'>;
type Answer = { answer: string; word: string };
type RightAnswer = Pick<Answer, 'word'>;

export type CurrentGameState = {
  wordsSource: wordsSourceType;
  gameType: gameType;
  words: WordToTrain[];
  rightAnswers: RightAnswer[];
  wrongAnswers: Answer[];
};

const initialState: CurrentGameState = {
  wordsSource: undefined,
  gameType: undefined,
  words: [],
  rightAnswers: [],
  wrongAnswers: [],
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

    clearCurrentgame: () => initialState,
  },
  extraReducers: () => {},
});

export const { setGameType, setWordsSource, setWordsToTrain, clearCurrentgame } = currentGameSlice.actions;

export default currentGameSlice.reducer;
