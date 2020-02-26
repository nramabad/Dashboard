import axios from "axios";

export const getMath = (op, exp) => axios.get(`https://newton.now.sh/${op}/${exp}`);
