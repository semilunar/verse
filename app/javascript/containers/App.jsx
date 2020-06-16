import React from "react";
import axios from "axios";
import { ActionCableProvider } from "react-actioncable-provider";
import { connect } from "react-redux";

import { BrowserRouter as Router } from "react-router-dom";

import MainContainer from "./MainContainer";
import AuthModal from "../components/AuthModal";
import ConfirmPublishModal from "../components/ConfirmPublishModal";

const csrfToken = document.querySelector('[name="csrf-token"]').content;
axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

const App = ({ auth, confirmPublish }) => (
  <ActionCableProvider url="ws://localhost:3000/cable">
    <Router>
      <MainContainer />
      {auth && <AuthModal />}
      {confirmPublish && <ConfirmPublishModal />}
    </Router>
  </ActionCableProvider>
);

export default connect(({ togglers: { auth, confirmPublish } }) => ({
  auth,
  confirmPublish
}))(App);
