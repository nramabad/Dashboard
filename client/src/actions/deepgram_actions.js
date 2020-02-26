import * as APIUtil from "../util/deepgram_api_util";

export const RECEIVE_TRANSCRIPTION = "RECEIVE_TRANSCRIPTION";

export const receiveTranscription = result => ({
    type: RECEIVE_TRANSCRIPTION,
    result
});

export const fetchTranscription = () => dispatch =>
    APIUtil.getTranscription().then(result =>
        dispatch(receiveTranscription(result))
    );
