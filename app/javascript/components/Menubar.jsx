import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

import stringToColor from "../helpers/stringToColor";

const Menubar = ({ user }) => {
  return (
    <div className="menubar">
      <NavLink to="/about" className="menubar__link">
        info
      </NavLink>
      <NavLink to="/rooms" className="menubar__link">
        rooms
      </NavLink>
      <NavLink to="/projects" className="menubar__link">
        projects
      </NavLink>

      {user && (
        <>
          <div
            className="avatar"
            style={{ backgroundColor: stringToColor(user.id.slice(-20)) }}
          ></div>
          <div className="nickname">{user.username}</div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(Menubar);
