import * as APIUtil from "../util/weather_api_util";

export const RECEIVE_LOCATIONS = "RECEIVE_DOMAIN";
export const RECEIVE_WEATHER = "RECEIVE_WEATHER";

export const receiveLocations = locations => ({
  type: RECEIVE_LOCATIONS,
  locations
});

export const fetchLocations = query => dispatch =>
  APIUtil.getLocations(query).then(locations =>
    dispatch(receiveLocations(locations))
  );

export const receiveWeather = weather => ({
  type: RECEIVE_WEATHER,
  weather
});

export const fetchWeather = woeid => dispatch =>
  APIUtil.getWeather(woeid).then(weather => dispatch(receiveWeather(weather)));