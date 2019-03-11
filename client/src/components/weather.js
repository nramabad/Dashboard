import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Weather extends React.Component {

}

const mapStateToProps = state => {

    return ({

    })
};

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Weather));