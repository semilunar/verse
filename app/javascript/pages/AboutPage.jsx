import React from "react";

import NewConversationForm from "../components/NewConversationForm";

export default () => {
  return (
    <div className="about-container">
      <h1 className="logo">Massage To You</h1>

      <div className="description-wrap">
        <h2 className="subheader">About</h2>
        <p className="about-description">
          This project is a game to write text together. It's only draft. To
          date, the only Millennium Prize problem to have been solved is the
          Poincare conjecture, which was solved in 2003 by the Russian
          mathematician Grigori Perelman, who declined the prize money.
        </p>
      </div>

      <p className="contacts">
        <a href="https://semilunar.github.io/meh.html">katja nikitina</a> 2020
      </p>
    </div>
  );
};
