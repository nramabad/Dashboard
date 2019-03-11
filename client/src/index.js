import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import "./assets/stylesheets/index.css";
import Dashboard from "./dashboard";
import configureStore from "./store";

import { fetchDomain, fetchEmail } from "./actions/pwned_actions";
import { getEmailPwnage, getDomainPwnage } from "./util/pwned_api_util";

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

  window.getState = store.getState;
  window.dispatch = store.dispatch;
  window.getEmail = getEmailPwnage;
  window.getDomain = getDomainPwnage;
  window.fetchDomain = fetchDomain;
  window.fetchEmail = fetchEmail;

  ReactDOM.render(<Root store={store} />, root);
});
