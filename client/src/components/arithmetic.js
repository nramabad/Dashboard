import React from "react";
import { connect } from "react-redux";
import { fetchMath } from "../actions/math_actions";

class Arithmetic extends React.Component {
  componentDidMount() {
    const { expression, operation } = this.props
    this.props.fetchMath(operation, expression)
  }

  componentDidUpdate(prevProps) {
    const { expression, operation } = this.props;
    if (expression !== prevProps.expression || operation !== prevProps.operation) {
      this.props.fetchMath(operation, expression);
    }
  }

  beautifyMath(expression) {
    // boolean for when a value should be in superscript
    let superScript = false;

    // an array of mapped react objects for prettified math expressions
    const prettyExpression = [...expression].map((ch, idx) => {
      if (ch === "^") superScript = true;
      if (" -+*/".includes(ch)) superScript = false;

      if (!!ch.match(/[a-z]/i)) {
        // variables and letters are italicized
        return superScript ? (
          <sup>
            <i key={idx}>{ch}</i>
          </sup>
        ) : (
          <i key={idx}>{ch}</i>
        );
      } else if (ch !== "^") {
        // all characters/numbers undergo the check for superscript
        return superScript ? (
          <sup key={idx}>{ch}</sup>
        ) : (
          <span key={idx}>{ch}</span>
        );
      }

      return <span key={idx}></span>
    });
    return prettyExpression;
  }

  render() {
    if (!this.props || !this.props.math) {
      return (<div className="small-show">Loading...</div>)
    }

    let { operation, expression, result } = this.props.math
    operation = operation.charAt(0).toUpperCase() + operation.slice(1);

    return (
      <>
        <br />
        Operation: <div>{operation}</div>
        <br />
        Expression: <div id="math">{this.beautifyMath(expression)}</div>
        <br />
        Result: <div id="math">{this.beautifyMath(result)}</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    math: state.entities.math
  };
};

const mapDispatchToProps = dispatch => ({
    fetchMath: (op, exp) => dispatch(fetchMath(op, exp))
});

export default connect(mapStateToProps, mapDispatchToProps)(Arithmetic);
