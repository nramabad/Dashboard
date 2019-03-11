import { RECEIVE_MATH } from '../actions/math_actions';

const MathReducer = (state = {}, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_MATH:
            return action.math;
        default:
            return state;
    }
};

export default MathReducer;