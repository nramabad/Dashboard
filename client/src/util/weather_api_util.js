import axios from "axios";

export const getLocations = query => axios.get(`/api/weather/search/${query}`);

export const getWeather = id => axios.get(`/api/weather/${id}`);
