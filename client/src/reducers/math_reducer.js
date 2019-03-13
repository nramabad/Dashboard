import { RECEIVE_MATH } from '../actions/math_actions';

const mathReducer = (state = null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_MATH:
            return action.result.data;
        default:
            return state;
    }
};

export default mathReducer;