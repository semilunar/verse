import React from "react";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../store";

import MainContainer from "./MainContainer";

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

export default () => (
  <Provider store={store}>
    <MainContainer />
  </Provider>
);
