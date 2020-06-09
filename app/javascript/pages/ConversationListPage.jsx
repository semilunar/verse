import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { Link } from "react-router-dom";

import NewConversationForm from "../components/NewConversationForm";

import stringToColor from "../helpers/stringToColor";

export default ({ setActiveConversation, conversations, handleDelete }) => {
  return (
    <div className="conversation-container">
      <NewConversationForm />
      <h2 className="subheader">Or join an existing one:</h2>
      <ul className="conversation-list">
        {conversations.length > 0 &&
          conversations.map(c => (
            <Link to={`/room/${c.id}`} key={c.id}>
              <li
                onClick={() => setActiveConversation(c.id)}
                onContextMenu={() => handleDelete(c.id)}
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
