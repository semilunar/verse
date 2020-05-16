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
        <label>Create a new conversation:</label>
        <div>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input type="submit" />
        </div>
      </form>
    </div>
  );
};
