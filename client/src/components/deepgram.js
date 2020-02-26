import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchEmail, fetchDomain } from "../actions/pwned_actions";

class Deepgram extends React.Component {
    // componentDidMount() {
    //
    // }
    //
    // componentDidUpdate(prevProps) {
    //
    // }

    render() {
        return <></>
    }
}

const mapStateToProps = state => {
    return {
        email: state.entities.pwned.email,
        domain: state.entities.pwned.domain
    };
};

const mapDispatchToProps = dispatch => ({
    fetchDomain: domain => dispatch(fetchDomain(domain)),
    fetchEmail: email => dispatch(fetchEmail(email))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Deepgram)
);
