import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [title, setTitle] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("/conversations", { title });
    setTitle("");
  };

  return (
    <div className="newConversationForm">
      <form onSubmit={handleSubmit}>
        <label className="subheader">Create a new room:</label>
        <div className="form_wrap">
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input type="submit" value="Create" style={{ fontSize: 16 }} />
        </div>
      </form>
    </div>
  );
};
