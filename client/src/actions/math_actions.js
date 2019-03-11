import * as APIUtil from "../util/math_api_util";

export const RECEIVE_MATH = "RECEIVE_MATH";

export const receiveMath = result => ({
  type: RECEIVE_MATH,
  result
});

export const fetchMath = (op, exp) => dispatch =>
  APIUtil.getMath(op, exp).then(result =>
    dispatch(receiveMath(result))
  );
