import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMath } from "../actions/math_actions";

class Arithmetic extends React.Component {
  componentDidMount() {
    const { math, operation } = this.props
    this.props.fetchMath(operation, math)
  }

  componentDidUpdate(prevProps) {
    const { math, operation } = this.props;
    if (math !== prevProps.math || operation !== prevProps.operation) {
      this.props.fetchMath(operation, math);
    }
  }

  render() {
    return (<></>)
  }
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