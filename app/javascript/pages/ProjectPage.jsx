import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import getDate from "../helpers/getDate";
import setTitle from "../helpers/setTitle";

const ProjectPage = ({
  match: {
    params: { id }
  },
  publications
}) => {
  const [project, setProject] = useState(null);
  useEffect(() => {
    handleSelectProject(id);

    return () => setTitle("Verse — A Massage To You");
  }, [id, publications]);

  const handleSelectProject = id => {
    const pub = publications.find(p => p.id == id);

    if (pub) {
      setProject(pub);
      setTitle(pub.title);
    } else {
      setProject(false);
    }
  };

  const renderProject = () => (
    <>
      <h2 className="project-title">{project.title}</h2>
      <div className="project-content">{project.content}</div>
      <div className="project-authors">{project.authors}</div>
      <div className="project-date">{getDate(project.created_at)}</div>
    </>
  );

  return (
    <div className="project-page">
      {project !== null && project ? renderProject() : <h3>Nothing found</h3>}
    </div>
  );
};

const mapStateToProps = ({ publications }) => ({ publications });

export default connect(mapStateToProps)(ProjectPage);
