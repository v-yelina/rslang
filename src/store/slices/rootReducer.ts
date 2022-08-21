import { combineReducers } from '@reduxjs/toolkit';
import currentGameSlice from './currentGame';
import textbookSlice from './textbook';

export default combineReducers({ currentGame: currentGameSlice, textbook: textbookSlice });
