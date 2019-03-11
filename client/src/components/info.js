import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class InfoBox extends React.Component {}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InfoBox)
);