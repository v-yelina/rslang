import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWord } from "../../../interfaces/IWord";

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
}

const initialState: SprintGameState = {
  wordsSource: undefined,
  gameType: "sprint",
  words: [],
  rightAnswers: [],
  wrongAnswers: [],
  currentWord: undefined,
  score: 0,
}

export const sprintGameSlice = createSlice({
  name: 'sprintGame',
  initialState,
  reducers: {
    setWordsSource: (state, action: PayloadAction<WordsSourceType>) => {
      state.wordsSource = action.payload;
    },
    setWordsToTrain: (state, action: PayloadAction<WordToGame[]>) => {
      state.words = action.payload;
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
  extraReducers: () => {},
});

export const {
  setWordsSource,
  setWordsToTrain,
  addRightAnswer,
  addWrongAnswer,
  setCurrentRoundWord,
  setGameScore,
  clearCurrentGame
} = sprintGameSlice.actions;

export default sprintGameSlice.reducer;
