import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Pwned extends React.Component {

}

const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps = dispatch => ({
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Pwned)
);