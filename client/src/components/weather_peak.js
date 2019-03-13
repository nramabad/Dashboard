import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchWeather } from "../actions/weather_actions";

class WeatherPeak extends React.Component {
    // will display today's weather in the corner of page
}

const mapStateToProps = state => {

    return ({

    })
};

const mapDispatchToProps = dispatch => ({
    fetchWeather: woeid => dispatch(fetchWeather(woeid)),
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(WeatherPeak));