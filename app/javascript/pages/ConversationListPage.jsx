import React, { useEffect } from "react";
import { ActionCable } from "react-actioncable-provider";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import NewConversationForm from "../components/NewConversationForm";

import { toggleAuth } from "../store/togglers/actions";

import stringToColor from "../helpers/stringToColor";

const ConversationListPage = ({ conversations, user, toggleAuth }) => {
  useEffect(() => {
    if (!user) {
      toggleAuth(true);
    } else {
      toggleAuth(false);
    }
  }, [user, conversations]);

  return (
    <div className="conversation-container">
      <NewConversationForm />
      <h2 className="subheader">Or join an existing one:</h2>
      <ul className="conversation-list">
        {conversations.length > 0 &&
          conversations.map(c => (
            <Link to={`/room/${c.id}`} key={c.id}>
              <li
                className="conversation-item"
                style={{ background: stringToColor((c.id * 9e9).toString()) }}
              >
                {c.title}
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ conversations, user }) => ({
  conversations,
  user
});

const mapDispatchToProps = dispatch => ({
  toggleAuth: bool => dispatch(toggleAuth(bool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationListPage);
