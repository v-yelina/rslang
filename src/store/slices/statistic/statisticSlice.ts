import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IStatistic } from '../../../interfaces/IStatistic';
import { fetchUserStatistic } from '../../thunks';

type StatisticState = {
  isLoading: boolean;
  statistic: IStatistic;
}

const initialState: StatisticState = {
  isLoading: false,
  statistic: {
    learnedWords: 0,
    optional: {
      statisticDay: new Date(),
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

};

export const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {
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
  },
});

export const {
  clearstatistic,
} = statisticSlice.actions;

export default statisticSlice.reducer;
