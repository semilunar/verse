import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "../containers/App";

import store from "../store";

const fullApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

const root = document.createElement("div");
root.id = "root";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(fullApp, document.body.appendChild(root));
});
