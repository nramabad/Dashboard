import { RECEIVE_LOCATIONS, RECEIVE_WEATHER } from "../actions/weather_actions";

const weatherReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_LOCATIONS:
        return action.locations;
    case RECEIVE_WEATHER:
        return action.weather;
    default:
      return state;
  }
};

export default weatherReducer;
