import React, { useEffect } from "react";

export default ({
  match: {
    params: { pid }
  }
}) => {
  useEffect(() => {
    console.log(pid);
  }, [pid]);
  return (
    <div className="project-page">
      <h2 className="title">project {pid}</h2>
      <div className="text"></div>

      <div className="authors"></div>
      <div className="date"></div>
    </div>
  );
};
