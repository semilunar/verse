import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default () => {
  return (
    <div className="menubar">
      <NavLink to="/about">
        <a className="menubar__link">info</a>
      </NavLink>
      <NavLink to="/rooms">
        <a className="menubar__link">rooms</a>
      </NavLink>
      <NavLink to="/projects">
        <a className="menubar__link">projects</a>
      </NavLink>
    </div>
  );
};
