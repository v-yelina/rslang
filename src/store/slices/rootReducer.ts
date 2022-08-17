import { combineReducers } from '@reduxjs/toolkit';
import currentGameSlice from './currentGame/currentGameSlice';

export default combineReducers({ currentGameSlice });
