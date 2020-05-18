import React from "react";
import { Link } from "react-router-dom";

import NewConversationForm from "../components/NewConversationForm";

export default () => {
  return (
    <div className="about-container">
      <h1 className="logo">Massage To You</h1>

      <div className="description-wrap">
        <h2 className="subheader">About</h2>
        <p className="about-description">
          To date, the only Millennium Prize problem to have been solved is the
          Poincaré conjecture, which was solved in 2003 by the Russian
          mathematician Grigori Perelman, who declined the prize money.
        </p>

        <div className="buttons-wrap">
          <Link to="/rooms">
            <button>Create a doc</button>
          </Link>
          <Link to="/rooms">
            <button>Join a show</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
