import { RECEIVE_EMAIL, RECEIVE_DOMAIN } from "../actions/pwned_actions";

const pwnedReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_EMAIL:
            return action.email;
        case RECEIVE_DOMAIN:
            return action.domain;
        default:
            return state;
    }
};

export default pwnedReducer;
