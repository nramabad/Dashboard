import React, { Component } from 'react';
// import { Route, withRouter, Link, Switch } from "react-router-dom";
// import logo from './assets/images/logo.svg';
import './assets/stylesheets/dashboard.css';
import Arithmetic from './components/arithmetic';
import Pwned from './components/pwned';
import Weather from './components/weather';
import WeatherPeak from "./components/weather_peak";

const TYPES = {
  NAME: "Generate a new robot avatar from your name...", 
  EMAIL: "Check if an e-mail has been pwned...", 
  DOMAIN: "Check if a website domain has been pwned...", 
  LOCATION: "Get the weather forecast in...", 
  MATH: "Evaluate an arithmetic expression..."
}

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      name: "GUEST",
      email: "",
      domain: "",
      location: "",
      math: "",
      showMenu: false,
      queryType: "NAME"
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.menuDisplay = this.menuDisplay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  showMenu(e) {
    e.preventDefault();

    this.setState({ showMenu: true }, () => {
      document.addEventListener("click", this.closeMenu);
    });
  }

  closeMenu() {
    this.setState({ showMenu: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  }

  menuDisplay(clicked) {
    const menuOptions = Object.keys(TYPES)
      .filter(option => option !== clicked)
      .map((option, idx) => (
        <button key={idx} onClick={() => this.menuDisplay(option)}>
          {option}
        </button>
      ));

    if (this.state.queryType !== clicked) this.setState({ queryType: clicked });

    return menuOptions;
  }

  handleChange() {
    return e => {
      this.setState({ query: e.target.value });
    };
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      e.preventDefault();
      this.setState({ [this.state.queryType.toLowerCase()]: this.state.query })
      this.setState( { query: "" });
    }
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={`https://robohash.org/${this.state.name}`}
            className="App-logo"
            alt="logo"
          />
          <br />Hello {this.state.name}!
          <div className="search-bar">
              <span>
                <button onClick={this.showMenu} className='menu-button'>
                  { (this.state.showMenu ? "▲ " : "▼ ")
                    .concat(this.state.queryType)
                    .concat(": ") }
                </button>

                {this.state.showMenu ? (
                  <div className="menu">
                    {this.menuDisplay(this.state.queryType)}
                  </div>
                ) : null}
              </span>
              <span>
                <form className="search-form">
                  <input
                    type="text"
                    value={this.state.query}
                    placeholder={TYPES[this.state.queryType]}
                    onChange={this.handleChange()}
                    onKeyPress={e => this.handleKeyPress(e)}
                  />
                </form>
              </span>
          </div>
          <div className="info-box">
          </div>
        </header>
      </div>
    );
  }
}

export default Dashboard;
