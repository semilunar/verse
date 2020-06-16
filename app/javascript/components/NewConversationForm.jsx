import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";

const NewConversationForm = ({ user }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("/conversations", { title, author: user.id });
    setTitle("");
  };

  return (
    <div className="newConversationForm">
      <form onSubmit={handleSubmit}>
        <label className="subheader">
          Create a new room:{" "}
          {title.length > 0 && <span>{title.length}/42</span>}
        </label>
        <div className="form-wrap">
          <input
            type="text"
            value={title}
            maxlength="42"
            onChange={e => setTitle(e.target.value)}
          />
          <input type="submit" value="Create" style={{ fontSize: 16 }} />
        </div>
      </form>
    </div>
  );
};

export default connect(({ user }) => ({ user }))(NewConversationForm);
