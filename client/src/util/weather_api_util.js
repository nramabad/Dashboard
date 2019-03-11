import axios from "axios";

export const getWeather = loc => {
  return axios.get(`/api/weather?location=${loc}`);
};

window.axios = axios;