import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLocations, fetchWeather } from "../actions/weather_actions";

class Weather extends React.Component {

  // will give a full weather forecast in the info box
  componentDidMount() {
    const { location } = this.props;
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
    }
  }

  render() {
    return <></>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    api_data: state.entities.weather
  })
};

const mapDispatchToProps = dispatch => ({
  fetchLocations: query => dispatch(fetchLocations(query)),
  fetchWeather: woeid => dispatch(fetchWeather(woeid))
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Weather));