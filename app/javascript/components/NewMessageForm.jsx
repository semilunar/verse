import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

import stringToColor from "../helpers/stringToColor";

const placeholders = [
  "First line is always hard, but I believe in you",
  "Other user's turn",
  "What have you done, do you even remember the word?"
];

const NewMessageForm = ({ conversation_id, user, lastMessage }) => {
  const [text, setText] = useState("");
  const [placeholder, setPlaceholder] = useState(placeholders[0]);
  const inputEl = useRef(null);

  useEffect(() => inputEl.current.focus());

  useEffect(() => {
    if (!lastMessage) return;

    const { text, author } = lastMessage;
    if (user.id === author) {
      setPlaceholder(placeholders[1]);
    } else {
      setPlaceholder(placeholders[2]);
      setText(text);
    }
  }, [lastMessage]);

  const handleSend = () => {
    axios.post("/typing", { typing: "", conversation_id, user: user.id });
    axios.post("/messages", { text, conversation_id, author: user.id });

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
    axios.post("/typing", { typing: value, conversation_id, user: user.id });

    if (value.length > 60) {
      handleSend();
    }
  };

  return (
    <div className="newMessageForm">
      <form onSubmit={handleSubmit}>
        <div className="form-wrap">
          <div
            className="author-avatar"
            style={{ backgroundColor: stringToColor(user.id.slice(-20)) }}
          />
          <input
            className="new-message-input"
            type="text"
            ref={inputEl}
            value={text}
            onChange={handleType}
            placeholder={placeholder}
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
