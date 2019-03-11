import { RECEIVE_MATH } from '../actions/math_actions';

const mathReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_MATH:
            return action.math.data.msg;
        default:
            return state;
    }
};

export default mathReducer;