import { RECEIVE_TRANSCRIPTION } from "../actions/deepgram_actions";

const emailReducer = (state = null, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_TRANSCRIPTION:
            return action.result.data;
        default:
            return state;
    }
};

export default emailReducer;
