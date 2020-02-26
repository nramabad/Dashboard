import axios from "axios";

export const getTranscription = () => axios.get(`/api/deepgram/random`);
