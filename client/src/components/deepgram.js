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
        console.log(this.props);
        return <></>
    }
}

const mapDispatchToProps = dispatch => ({ fetchTranscription: deepgram => dispatch(fetchTranscription(deepgram)) });
const mapStateToProps = ({ entities: { deepgram }}) => ({ deepgram });

export default connect(mapStateToProps, mapDispatchToProps)(Deepgram);
