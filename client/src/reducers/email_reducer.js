import { RECEIVE_EMAIL } from "../actions/pwned_actions";

const emailReducer = (state = null, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_EMAIL:
      return action.email.data.msg;
    default:
      return state;
  }
};

export default emailReducer;