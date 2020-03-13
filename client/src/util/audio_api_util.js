import axios from "axios";

export const downloadAudio = name => axios.get(`/api/deepgram/${name}`);

export const uploadAudio = name => axios.post(`/api/deepgram/${name}`);
