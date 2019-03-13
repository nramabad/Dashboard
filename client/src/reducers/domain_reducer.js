import { RECEIVE_DOMAIN } from "../actions/pwned_actions";

const domainReducer = (state = null, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_DOMAIN:
            return action.domain.data;
        default:
            return state;
    }
}

export default domainReducer;