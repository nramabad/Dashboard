import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {fetchTranscription} from "../actions/deepgram_actions";

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

const mapDispatchToProps = dispatch => ({ fetchTranscription: deepgram => dispatch(fetchTranscription(deepgram)) });
const mapStateToProps = ({ entities: { deepgram }}) => ({ deepgram });

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Deepgram)
);
