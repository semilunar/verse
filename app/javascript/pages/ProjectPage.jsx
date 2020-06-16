import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import getDate from "../helpers/getDate";

const ProjectPage = ({
  match: {
    params: { id }
  },
  publications
}) => {
  const [project, setProject] = useState(null);
  useEffect(() => {
    handleSelectProject(id);
  }, [id, publications]);

  const handleSelectProject = id => {
    const pub = publications.find(p => p.id == id);

    if (pub) {
      setProject(pub);
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
// возвращает объект с пропсом handleConversations, который есть функция,
// которая диспатчит экшн, payload которой есть data
// const mapDispatchToProps = dispatch => ({
//   handleConversations: data => dispatch(setConversations(data)),
//   setActiveConversation: id => dispatch(setConversation(id)),
//   updateConversations: conversation =>
//     dispatch(updateConversations(conversation)),
//   addConversation: conversation => dispatch(addConversation(conversation)),
//   handleUserToStore: data => dispatch(setUser(data)),
//   handleTypingToStore: (text, author) => dispatch(setTyping(text, author)),
//   handleLastMessage: (text, author) => dispatch(setLastMessage(text, author)),
//   deleteConversation: id => dispatch(deleteConversation(id)),
//   toggleAuth: bool => dispatch(toggleAuth(bool))
// });

export default connect(mapStateToProps)(ProjectPage);
