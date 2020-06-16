import React from "react";

export default ({ children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-container">{children}</div>
    </div>
  );
};
