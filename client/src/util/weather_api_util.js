import axios from "axios";

export const getLocations = query => {
  return axios.get(`/api/weather/search/${query}`)
}

export const getWeather = id => {
  return axios.get(`/api/weather/${id}`);
};

window.axios = axios;