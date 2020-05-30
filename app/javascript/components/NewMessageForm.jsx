import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import stringToColor from "../helpers/stringToColor";

const NewMessageForm = ({ conversation_id, user, lastMessage }) => {
  const [text, setText] = useState("");
  const inputEl = useRef(null);

  useEffect(() => inputEl.current.focus());

  useEffect(() => {
    if (!lastMessage) return;

    setText(lastMessage);
  }, [lastMessage]);

  const handleSend = () => {
    axios.post("/typing", { typing: "", conversation_id, user });
    axios.post("/messages", { text, conversation_id, author: user });

    setText("");
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!text) return;

    handleSend();
  };

  const handleType = e => {
    const { value } = e.target;
    setText(value);
    axios.post("/typing", { typing: value, conversation_id, user });

    if (value.length > 60) handleSend();
  };

  return (
    <div className="newMessageForm">
      <form onSubmit={handleSubmit}>
        <div className="form_wrap">
          <div
            className="author-avatar"
            style={{ backgroundColor: stringToColor(user.slice(-20)) }}
          />
          <input
            className="new-message-input"
            type="text"
            ref={inputEl}
            value={text}
            onChange={handleType}
            placeholder="First line is always hard, but I believe in you"
          />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ user, conversation: { lastMessage } }) => ({
  user,
  lastMessage
});

export default connect(mapStateToProps)(NewMessageForm);
