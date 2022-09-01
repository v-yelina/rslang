import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISettings } from '../../../interfaces/ISettings';
import { IMiniGameStat, IStatistic } from '../../../interfaces/IStatistic';
import { getToday } from '../../../pages/statistics/helpers';
import {
  fetchUserSettings, fetchUserStatistic, updateSettings, updateStatistic,
} from '../../thunks';

type StatisticState = {
  isLoading: boolean;
  statistic: IStatistic;
  settings: ISettings;
  error: string | null,
}

const initialState: StatisticState = {
  isLoading: false,
  error: null,
  statistic: {
    learnedWords: 0,
    optional: {
      statisticDay: getToday(),
      audiochallenge: {
        newWords: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        longestCombo: 0,
        gamesPlayed: 0,
      },
      sprint: {
        newWords: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        longestCombo: 0,
        gamesPlayed: 0,
      },
    },
  },
  settings: {
    wordsPerDay: 0,
    optional: {
      day: '',
      newWordsCount: 0,
      gamesCount: 0,
    },
  },

};

export const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
    setDate: (state, action: PayloadAction<string>) => {
      state.statistic.optional.statisticDay = action.payload;
    },
    setLearnedWords: (state, action: PayloadAction<number>) => {
      state.statistic.learnedWords += action.payload;
    },
    // setAudiochallengeResults: (state, action: PayloadAction<Omit<IMiniGameStat, 'gamesPlayed'>>) => {
    //   const newStat = {
    //     newWords:
    //     state.statistic.optional.audiochallenge.newWords + action.payload.newWords,
    //     correctAnswers:
    //     state.statistic.optional.audiochallenge.correctAnswers + action.payload.correctAnswers,
    //     wrongAnswers:
    //     state.statistic.optional.audiochallenge.wrongAnswers + action.payload.wrongAnswers,
    //     longestCombo:
    //     state.statistic.optional.audiochallenge.longestCombo > action.payload.longestCombo
    //       ? state.statistic.optional.audiochallenge.longestCombo : action.payload.longestCombo,
    //     gamesPlayed:
    //     state.statistic.optional.audiochallenge.gamesPlayed += 1,
    //   };
    //   state.statistic.optional.audiochallenge = newStat;
    //   console.log(state.statistic.optional.audiochallenge);
    // },
    // setSprintResults: (state, action: PayloadAction<Omit<IMiniGameStat, 'gamesPlayed'>>) => {
    //   state.statistic.optional.sprint = {
    //     newWords:
    //     state.statistic.optional.sprint.newWords + action.payload.newWords,
    //     correctAnswers:
    //     state.statistic.optional.sprint.correctAnswers + action.payload.correctAnswers,
    //     wrongAnswers:
    //     state.statistic.optional.sprint.wrongAnswers + action.payload.wrongAnswers,
    //     longestCombo:
    //     state.statistic.optional.sprint.longestCombo > action.payload.longestCombo
    //       ? state.statistic.optional.sprint.longestCombo : action.payload.longestCombo,
    //     gamesPlayed: state.statistic.optional.sprint.gamesPlayed += 1,
    //   };
    // },
    clearstatistic: () => initialState,
  },
  extraReducers: {
    [fetchUserStatistic.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUserStatistic.fulfilled.type]: (state, action: PayloadAction<IStatistic>) => {
      state.isLoading = false;
      state.statistic = {
        ...action.payload,
      };
    },
    [fetchUserStatistic.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateStatistic.fulfilled.type]: (state, action: PayloadAction<IStatistic>) => {
      state.isLoading = false;
      state.statistic = {
        ...action.payload,
      };
    },
    [fetchUserSettings.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchUserSettings.fulfilled.type]: (state, action: PayloadAction<ISettings>) => {
      state.isLoading = false;
      state.settings = {
        ...action.payload,
      };
    },
    [fetchUserSettings.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [updateSettings.fulfilled.type]: (state, action: PayloadAction<ISettings>) => {
      state.isLoading = false;
      state.settings = {
        ...action.payload,
      };
    },
  },
});

export const {
  setDate,
  setLearnedWords,
  // setAudiochallengeResults,
  // setSprintResults,
  clearstatistic,
} = statisticSlice.actions;

export default statisticSlice.reducer;
