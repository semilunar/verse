import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default () => {
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
    </div>
  );
};
