import React from "react";
import { connect } from "react-redux";

import Modal from "../containers/Modal";

import newUserAuth from "../helpers/newUserAuth";
import { setUser } from "../store/user/actions";
import { toggleAuth } from "../store/togglers/actions";

const AuthModal = ({ toggleAuth, setUser }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const value = e.target.firstChild.value.trim();
    if (!value) return;

    const userInfo = newUserAuth(value);
    setUser(userInfo);
    toggleAuth(false);
  };

  return (
    <Modal>
      <h3>Wait a sec! Set your nickname first</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Unknown Bird" maxLength="25" />
        <input type="submit" value="Save" style={{ fontSize: 16 }} />
      </form>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleAuth: bool => dispatch(toggleAuth(bool)),
  setUser: user => dispatch(setUser(user))
});

export default connect(
  null,
  mapDispatchToProps
)(AuthModal);
