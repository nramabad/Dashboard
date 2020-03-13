import React from "react";
import { connect } from "react-redux";
import {fetchTranscription} from "../actions/deepgram_actions";

class Deepgram extends React.Component {
    componentDidMount() {
        this.props.fetchTranscription();
    }
    //
    // componentDidUpdate(prevProps) {
    //
    // }

    render() {
        if (this.props.deepgram) return <>{this.props.deepgram.results.channels[0].alternatives[0].transcript}</>;
        return <img id="loading" src="https://i.pinimg.com/originals/ac/44/71/ac4471291c620d8dd47697a1d8da4975.gif" alt="Loading..." />
    }
}

const mapDispatchToProps = dispatch => ({ fetchTranscription: deepgram => dispatch(fetchTranscription(deepgram)) });
const mapStateToProps = ({ entities: { deepgram }}) => ({ deepgram });

export default connect(mapStateToProps, mapDispatchToProps)(Deepgram);
