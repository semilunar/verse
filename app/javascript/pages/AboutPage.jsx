import React from "react";

import NewConversationForm from "../components/NewConversationForm";

export default () => {
  return (
    <div className="about-container">
      <h1 className="logo">Verse — A Massage To You</h1>

      <div className="description-wrap">
        <h2 className="subheader">About</h2>
        <p className="about-description">
          This project is a game to write text together, poetry or prose or
          whatever. Create a room, sent the link to your friend or
          <em> wait for the stranger</em>. First line is always hard, but be
          tactful: every last word of your line is the first word of next
          person's saying. You won't see the full work before publish. Like in a
          Chinese whispers game, oh, what tender stanzas will you get.
        </p>
      </div>

      <p className="contacts">
        от{" "}
        <a href="https://telegram.me/semilunar" target="_blank">
          katja nikitina
        </a>{" "}
        в 2020
      </p>
    </div>
  );
};
