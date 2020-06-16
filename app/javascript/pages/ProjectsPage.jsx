import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import getDate from "../helpers/getDate";

import { setPublications } from "../store/publications/actions";

const ProjectsPage = ({ publications }) => {
  return (
    <div className="projects-page">
      <h2 className="subheader">Finished projects</h2>
      {publications.length > 0 ? (
        <ul className="projects-list">
          {publications.map(pub => (
            <Link
              to={`/project/${pub.id}`}
              key={pub.id}
              className="project-item"
            >
              <div className="project-title">{pub.title}</div>
              <span className="project-authors">{pub.authors}</span>
              <span className="project-date">{getDate(pub.created_at)}</span>
            </Link>
          ))}
        </ul>
      ) : (
        <p>Nothing here yet...</p>
      )}
    </div>
  );
};

const mapStateToProps = ({ publications }) => ({ publications });

export default connect(mapStateToProps)(ProjectsPage);
