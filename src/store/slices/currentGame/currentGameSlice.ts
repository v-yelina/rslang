import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../../../interfaces/IWord';

type wordsSourceType = 'group' | 'textbook' | undefined;

type gameType = 'audiochallenge' | 'sprint' | undefined;

export type WordToTrain = Pick<IWord, 'id' | 'word' | 'image' | 'audio' | 'wordTranslate'>;
type Answer = { answer: string; word: string; audio: string; id: string };
type RightAnswer = Pick<Answer, 'word' | 'audio' | 'id'>;

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
  words: [{
    id: '5e9f5ee35eb9e72bc21afbda',
    word: 'exceptional',
    image: 'files/03_1850.jpg',
    audio: 'files/03_1850.mp3',
    wordTranslate: 'исключительный',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbd5',
    word: 'Bible',
    image: 'files/03_1845.jpg',
    audio: 'files/03_1845.mp3',
    wordTranslate: 'библия',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbdc',
    word: 'outrage',
    image: 'files/03_1853.jpg',
    audio: 'files/03_1853.mp3',
    wordTranslate: 'безобразие',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbd3',
    word: 'betray',
    image: 'files/03_1844.jpg',
    audio: 'files/03_1844.mp3',
    wordTranslate: 'предавать',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbdf',
    word: 'pastor',
    image: 'files/03_1856.jpg',
    audio: 'files/03_1856.mp3',
    wordTranslate: 'пастор',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbd6',
    word: 'detain',
    image: 'files/03_1848.jpg',
    audio: 'files/03_1848.mp3',
    wordTranslate: 'задержать',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbd9',
    word: 'exit',
    image: 'files/03_1849.jpg',
    audio: 'files/03_1849.mp3',
    wordTranslate: 'выход',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbd0',
    word: 'align',
    image: 'files/03_1841.jpg',
    audio: 'files/03_1841.mp3',
    wordTranslate: 'выравнивание',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbd2',
    word: 'barn',
    image: 'files/03_1843.jpg',
    audio: 'files/03_1843.mp3',
    wordTranslate: 'сарай',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbd8',
    word: 'flee',
    image: 'files/03_1851.jpg',
    audio: 'files/03_1851.mp3',
    wordTranslate: 'бежать',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbde',
    word: 'parish',
    image: 'files/03_1854.jpg',
    audio: 'files/03_1854.mp3',
    wordTranslate: 'приход',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbd4',
    word: 'Catholic',
    image: 'files/03_1846.jpg',
    audio: 'files/03_1846.mp3',
    wordTranslate: 'католический',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbd7',
    word: 'cooperate',
    image: 'files/03_1847.jpg',
    audio: 'files/03_1847.mp3',
    wordTranslate: 'сотрудничать',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbdd',
    word: 'passage',
    image: 'files/03_1855.jpg',
    audio: 'files/03_1855.mp3',
    wordTranslate: 'проход',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbe2',
    word: 'rail',
    image: 'files/03_1859.jpg',
    audio: 'files/03_1859.mp3',
    wordTranslate: 'рельсы',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbdb',
    word: 'network',
    image: 'files/03_1852.jpg',
    audio: 'files/03_1852.mp3',
    wordTranslate: 'сеть',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbe3',
    word: 'tunnel',
    image: 'files/03_1860.jpg',
    audio: 'files/03_1860.mp3',
    wordTranslate: 'туннель',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbd1',
    word: 'authority',
    image: 'files/03_1842.jpg',
    audio: 'files/03_1842.mp3',
    wordTranslate: 'орган власти',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbe0',
    word: 'patrol',
    image: 'files/03_1857.jpg',
    audio: 'files/03_1857.mp3',
    wordTranslate: 'патруль',
  },
  {
    id: '5e9f5ee35eb9e72bc21afbe1',
    word: 'raid',
    image: 'files/03_1858.jpg',
    audio: 'files/03_1858.mp3',
    wordTranslate: 'рейд',
  }],
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

    clearCurrentGame: () => initialState,
  },
  extraReducers: () => {},
});

export const {
  setGameType, setWordsSource, setWordsToTrain, clearCurrentGame,
} = currentGameSlice.actions;

export default currentGameSlice.reducer;
