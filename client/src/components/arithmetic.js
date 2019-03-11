import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMath } from "../actions/math_actions";

class Arithmetic extends React.Component {

}

const mapStateToProps = (state, ownProps) => {
  return {
      expression: ownProps.expression,
      result: state.entities.math
  };
};

const mapDispatchToProps = dispatch => ({
    fetchMath: (op, exp) => dispatch(fetchMath(op, exp))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Arithmetic)
);