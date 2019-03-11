import axios from "axios";

export const getMath = (op, exp) => {
  return axios.get(`https://newton.now.sh/${op}/${exp}`);
};
