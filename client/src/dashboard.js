import React, { Component } from 'react';
import './assets/stylesheets/dashboard.css';
import Arithmetic from './components/arithmetic';
import Pwned from './components/pwned';
// For future weather implementation!
// import Weather from './components/weather';
// import WeatherPeak from "./components/weather_peak";

const TYPES = {
  NAME: "Type your name to make a new robot...", 
  EMAIL: "Check if an e-mail has been pwned...", 
  DOMAIN: "Check if a website domain has been pwned...", 
  LOCATION: "Weather feature coming soon...", 
  MATH: "Evaluate an arithmetic expression..."
}

const ALG_OPS = {
  SIMPLIFY: "Simplify expression",
  FACTOR: "Factorize expression",
  DERIVE: "Derive expression",
  INTEGRATE: "Integrate expression",
  ZEROES: "Find zeroes where f(x) = 0",
  TANGENT: "Find the tangent line @ x = c (Format: c|f(x))",
  AREA: "Find the area under the curve from c to d (Format: c:d|f(x))",
}

const TRIG_OPS = {
  COS: "Cosine of numerical value",
  SIN: "Sine of numerical value",
  TAN: "Tangent of numerical value",
  ARCCOS: "Inverse cosine of numerical value",
  ARCSIN: "Inverse Sine of numerical value",
  ARCTAN: "Inverse Tangent of numerical value",
  ABS: "Absolute value of numerical value",
  LOG: "Logarithm base b of numerical value a (Format: b|a)"
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
      queryType: "NAME" // default widget is changing user name
    };

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.menuDisplay = this.menuDisplay.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
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
    // map menu buttons for options not currently selected
    const menuOptions = Object.keys(TYPES)
      .filter(option => option !== clicked)
      .map((option, idx) => (
        <button key={idx} onClick={() => this.menuDisplay(option)}>
          {option}
        </button>
      ));

    // set the current widget in use to the one selected by the user
    if (this.state.queryType !== clicked) {
      const key = clicked.toLowerCase()
      let queryVal = this.state[key] === "GUEST" ? "" : this.state[key];
      this.setState({ query: queryVal, queryType: clicked });
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
      this.handleSubmission(e);
    }
  }

  handleSubmission(e) {
    e.preventDefault();
    this.setState({ [this.state.queryType.toLowerCase()]: this.state.query });
  }

  dialogueBox() {
    const { name, math, operation, queryType } = this.state;
    const noShow = (<div className="small-show">Nothing to show...</div>)

    // populates information box based on user input and selected widget
    switch (queryType) {
      case "NAME":
        return (
          <div className="small-show">
            {name === "GUEST"
              ? "Don't be shy! What's your name?"
              : "We made a custom robot avatar just for you!"}
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
          noShow
        );
      case "LOCATION":
        // <div className="option">
        //  {Weather Component will go here}
        // </div>
        return (
          <div className="small-show">Weather feature coming soon!</div>
        );
      case "MATH":
        return operation.length && math.length ? (
          <Arithmetic key={1} expression={math} operation={operation} />
        ) : (
          <div className="option-height">{this.mathOperations()}</div>
        );
      default:
        return noShow;
    }

  }

  mathOperations() {
    let trig_ops = [];
    const { query } = this.state;

    // onClick fn to set the selected math operation and inputted expression
    const setMath = (option) =>
      this.setState({ operation: option.toLowerCase(), math: query });
    
    // buttons for Calculus operations 
    let alg_ops = Object.keys(ALG_OPS).map((option, idx) => (
      <button 
        key={idx} 
        onClick={() => setMath(option)} 
        className="option">
        {ALG_OPS[option]}
      </button>
    ));

    // buttons for Trigonometric operations do not appear for variables (x, y, z)
    // p and i are excluded so the user may input pi for π
    if (!query.match(/[a-h]|[j-o]|[q-z]/i)) {
      trig_ops = Object.keys(TRIG_OPS).map((option, idx) => (
        <button
          key={alg_ops.length + idx}
          onClick={() => setMath(option)}
          className="option"
        >
          {TRIG_OPS[option]}
        </button>
      ));
    }
    return alg_ops.concat(trig_ops);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <button
            onClick={() => window.location.reload()}
            className="robot"
          >
            <img
              src={`https://robohash.org/${this.state.name}`}
              className="App-logo"
              alt="logo"
            />
          </button>

          Hello {this.state.name}!
          <div className="search-bar">

            <span>
              <button onClick={this.showMenu} className="menu-button">
                {(this.state.showMenu ? "▲ " : "▼ ")
                  .concat(`${this.state.queryType}: `)}
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

            <span>
              <button onClick={e => this.handleSubmission(e)} id="submit">
                ⇒
              </button>
            </span>

          </div>
          
          <div className="info-box">{this.dialogueBox()}</div>
        </header>
      </div>
    );
  }
}

export default Dashboard;
