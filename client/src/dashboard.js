import React, { Component } from 'react';
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

const ALG_OPS = {
  SIMPLIFY: "Simplify expression",
  FACTOR: "Factorize expression",
  DERIVE: "Derive expression",
  INTEGRATE: "Integrate expression",
  ZEROES: "Find zeroes where f(x) = 0",
  TANGENT: "Find tangent @ x = c (Format: c|f(x))",
  AREA: "Find area under curve from c to d (Format: c:d|f(x))",
}

const TRIG_OPS = {
  COS: "Cosine of numerical value",
  SIN: "Sine of numerical value",
  TAN: "Tangent of numerical value",
  ARCCOS: "Inverse cosine of numerical value",
  ARCSIN: "Inverse Sine of numerical value",
  ARCTAN: "Inverse Tangent of numerical value",
  ABS: "Absolute value of numerical value",
  LOG: "Logarithm of numerical value"
};

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
      operation: "",
      showMenu: false,
      queryType: "NAME"
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.menuDisplay = this.menuDisplay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.dialogueBox = this.dialogueBox.bind(this);
    this.mathOperations = this.mathOperations.bind(this);
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

    if (this.state.queryType !== clicked) {
      const key = clicked.toLowerCase()
      let query_val = this.state[key] === "GUEST" ? "" : this.state[key];
      this.setState({ query: query_val, queryType: clicked });

    }

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
    }
  }

  dialogueBox() {
    const { name, location, math, operation, queryType } = this.state;
    const no_show = (<div className="small-show">Nothing to show...</div>)
    switch (queryType) {
      case "NAME":
        return (
          <div className="small-show">
            {name === "GUEST" ? 
              "Don't be shy! What's your name?" : 
              "We made a custom robot avatar just for you!"}
          </div>
        );
      case "EMAIL":
      case "DOMAIN":
        return this.state[queryType.toLowerCase()].length ? (
          <Pwned
            key={0}
            query={this.state[queryType.toLowerCase()]}
            queryType={queryType}
          />
        ) : (
          no_show
        );
      case "LOCATION":
        return (
          <div className="small-show">Weather feature coming soon!</div>
        );;
        // <div className="options">
        // </div>
      case "MATH":
        return operation.length && math.length ? (
          <Arithmetic
            key={0}
            math={math}
            operation={operation}
          /> ) : (
          <div className="options">
            {this.mathOperations()}
          </div>
        );
      default: 
        return no_show;
    }
  }

  mathOperations() {
    let trig_ops = [];
    const { query } = this.state;
    let alg_ops = Object.keys(ALG_OPS).map((option, idx) => (
      <button key={idx} onClick={() => this.setState({ operation: option.toLowerCase(), math: query })}>
        {ALG_OPS[option]}
      </button>
    ));
    if (!query.match(/[a-z]/i)) {
      trig_ops =Object.keys(TRIG_OPS).map((option, idx) => (
        <button key={alg_ops.length + idx} onClick={() => this.setState({ operation: option.toLowerCase(), math: query })}>
          {TRIG_OPS[option]}
        </button>
      ));
    }
    return alg_ops.concat(trig_ops);
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
            {this.dialogueBox()}
          </div>
        </header>
      </div>
    );
  }
}

export default Dashboard;
