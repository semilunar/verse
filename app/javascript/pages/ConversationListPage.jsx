import React from "react";
import { ActionCable } from "react-actioncable-provider";
import { Link } from "react-router-dom";

import NewConversationForm from "../components/NewConversationForm";

export default ({ setActiveConversation, conversations }) => {
  return (
    <div className="conversation-container">
      <NewConversationForm />
      <h2 className="header">Or join an existing one:</h2>
      <ul className="conversation-list">
        {conversations.length > 0 &&
          conversations.map(c => (
            <Link to={`/room/${c.id}`} key={c.id}>
              <li
                onClick={() => setActiveConversation(c.id)}
                className="conversation-item"
              >
                {c.title}
              </li>
            </Link>
          ))}
      </ul>
    </div>
  );
};
