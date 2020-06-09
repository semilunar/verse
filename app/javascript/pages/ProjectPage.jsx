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
      <h2 className="subheader">project {pid}</h2>
    </div>
  );
};
