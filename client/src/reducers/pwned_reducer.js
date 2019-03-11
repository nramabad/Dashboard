import { RECEIVE_EMAIL, RECEIVE_DOMAIN } from "../actions/pwned_actions";

const pwnedReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_EMAIL:
            return action.email.data.msg;
        case RECEIVE_DOMAIN:
            return action.domain.data.msg;
        default:
            return state;
    }
};

export default pwnedReducer;
