import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth } from '../../../interfaces/IAuth';
import { login, registration } from '../../thunks';

type AuthUser = Pick<IAuth, 'userId' | 'name' | 'refreshToken' | 'token'>

export type authState = {
  isLoading: boolean,
  user: AuthUser;
  error: string | null;
  isRegistred: boolean;
  isLogged: boolean;
}

const user = localStorage.getItem('user');

const initialState: authState = {
  isLoading: false,
  user: user ? JSON.parse(user) : {
    userId: '',
    name: '',
    refreshToken: '',
    token: '',
  },
  error: null,
  isRegistred: false,
  isLogged: !!user,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload;
    },
    setError: (state, action: PayloadAction<string |null>) => {
      state.error = action.payload;
    },
    clearIsRegistred: (state) => {
      state.isRegistred = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearAuth: () => initialState,
  },
  extraReducers: {
    [registration.pending.type]: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    [registration.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.isRegistred = true;
    },
    [registration.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [login.pending.type]: (state) => {
      state.isLoading = true;
      state.isLogged = false;
      state.error = null;
    },
    [login.fulfilled.type]: (state, action: PayloadAction<IAuth>) => {
      state.isLoading = false;
      state.isLogged = true;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    [login.rejected.type]: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isLogged = false;
      state.error = action.payload;
    },
  },
});

export const {
  setIsLoading,
  setUser,
  setError,
  clearAuth,
  clearIsRegistred,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
