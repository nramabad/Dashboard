import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import "./assets/stylesheets/index.css";
import Dashboard from "./dashboard";
import configureStore from "./store";

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Dashboard} />
    </BrowserRouter>
  </Provider>
);

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();
  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);
});
