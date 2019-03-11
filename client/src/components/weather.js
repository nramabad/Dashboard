import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchLocations, fetchWeather } from "../actions/weather_actions";

class Weather extends React.Component {

  componentDidMount() {
    // this.props.requestAllPokemon();
  }

  componentDidUpdate(prevProps) {
    // if (this.props.types.length !== prevProps.types.length) {
    //   this.props.types.forEach(type => this.props.requestOneType(type));
    // }
  }

  render() {
    return (<></>);
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