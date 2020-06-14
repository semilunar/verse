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
      <h2 className="project-title">project {pid}</h2>

      <div className="project-title">{pub.content}</div>

      <span className="project-authors">{pub.authors}</span>
      <span className="project-date">{pub.created_at}</span>
    </div>
  );
};
