import { combineReducers } from 'redux';
import math from './math_reducer';
import pwned from './pwned_reducer';
import weather from './weather_reducer';

const entitiesReducer = combineReducers({
  math,
  pwned,
  weather
});

export default entitiesReducer;