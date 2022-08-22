import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth';
import currentGameSlice from './currentGame';
import textbookSlice from './textbook';

export default combineReducers({ auth: authSlice, currentGame: currentGameSlice, textbook: textbookSlice });
