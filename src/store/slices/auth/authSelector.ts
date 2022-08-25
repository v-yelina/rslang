import { createSelector } from 'reselect';
import { RootState } from '../../index';

export const selectAuthReducer = (state: RootState) => state.auth;

export const selectIsLogged = createSelector(
  [selectAuthReducer],
  (authSlice) => authSlice.isLogged,
);

export const selectUser = createSelector([selectAuthReducer], (authSlice) => authSlice.user);
