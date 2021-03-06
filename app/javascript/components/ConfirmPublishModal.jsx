import React from "react";
import { connect } from "react-redux";
import axios from "axios";

import Modal from "../containers/Modal";

import { toggleConfirmPublish } from "../store/togglers/actions";

const ConfirmPublishModal = ({ toggleConfirmPublish, confirmPublish }) => {
  const handleSubmit = e => {
    e.preventDefault();

    const { conversation_id, author } = confirmPublish;
    toggleConfirmPublish(false);
    axios.post("/publications", {
      conversation_id,
      author
    });
  };

  const handleCancel = e => {
    e.preventDefault();
    toggleConfirmPublish(false);
  };

  return (
    <Modal>
      <h3>Do you really wanna finish the process and publish your text?</h3>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Confirm" style={{ fontSize: 16 }} />
        <button onClick={handleCancel} style={{ marginLeft: 20, fontSize: 16 }}>
          Cancel
        </button>
      </form>
    </Modal>
  );
};

const mapDispatchToProps = dispatch => ({
  toggleConfirmPublish: bool => dispatch(toggleConfirmPublish(bool))
});

export default connect(
  ({ togglers: { confirmPublish } }) => ({ confirmPublish }),
  mapDispatchToProps
)(ConfirmPublishModal);
