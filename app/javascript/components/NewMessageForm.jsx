import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const NewMessageForm = ({ conversation_id, user }) => {
  const [text, setText] = useState("");
  const [id, setId] = useState(0);

  useEffect(() => {
    setId(conversation_id);
  }, [conversation_id]);

  const handleSubmit = e => {
    e.preventDefault();

    axios.post("/messages", { text, conversation_id: id, author: user });

    setText("");
  };

  const handleType = e => {
    setText(e.target.value);
    axios.post("/typing", { typing: text, conversation_id: id, user });
  };

  return (
    <div className="newMessageForm">
      <form onSubmit={handleSubmit}>
        <label>New Message:</label>
        <div>
          <input type="text" value={text} onChange={handleType} />
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(NewMessageForm);
