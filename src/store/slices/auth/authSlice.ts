import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registration } from '../../thunks';

type AuthUser = {
  userId: string;
  name: string;
  email: string;
}

export type authState = {
  isLoading: boolean,
  user: AuthUser;
  error: string | null;
  isRegistred: boolean
}

const initialState: authState = {
  isLoading: false,
  user: {
    userId: '',
    name: '',
    email: '',
  },
  error: null,
  isRegistred: false,
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