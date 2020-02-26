import { combineReducers } from 'redux';
import math from './math_reducer';
import pwned from './pwned_reducer';
import weather from './weather_reducer';
import deepgram from './deepgram_reducer';

const entitiesReducer = combineReducers({
  deepgram,
  math,
  pwned,
  weather
});

export default entitiesReducer;
