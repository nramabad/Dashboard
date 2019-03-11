import axios from "axios";

export const getWeather = loc => {
  return axios.get(`/api/weather/${loc}`);
};

window.axios = axios;