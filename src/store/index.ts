import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './slices/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['statistic/fetchUserSettings/rejected', 'statistic/fetchUserStatistic/rejected'],
      ignoredPaths: ['statistic.error'],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
