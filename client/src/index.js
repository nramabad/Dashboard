import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import "./assets/stylesheets/index.css";
import Dashboard from "./dashboard";
import configureStore from "./store";

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <Route path="/" component={Dashboard} />
    </HashRouter>
  </Provider>
);

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();
  const root = document.getElementById("root");
  
  ReactDOM.render(<Root store={store} />, root);
});
