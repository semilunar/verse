import React, { useEffect, useState } from "react";
import { ActionCable } from "react-actioncable-provider";
import axios from "axios";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory
} from "react-router-dom";

import store from "../store";
import {
  setConversations,
  updateConversations,
  addConversation,
  deleteConversation
} from "../store/conversations/actions";
import {
  setConversation,
  setTyping,
  setLastMessage
} from "../store/conversation/actions";
import { setUser } from "../store/user/actions";
import { setPublications, addPublication } from "../store/publications/actions";

import Menubar from "../components/Menubar";
import AboutPage from "../pages/AboutPage";
import ProjectsPage from "../pages/ProjectsPage";
import ProjectPage from "../pages/ProjectPage";
import ConversationPage from "../pages/ConversationPage";
import ConversationListPage from "../pages/ConversationListPage";
import userAuthHandler from "../helpers/userAuthHandler";
import ActionCableContainer from "./ActionCableContainer";

const MainContainer = ({
  conversations,
  handleConversations,
  setActiveConversation,
  updateConversations,
  addConversation,
  handleUserToStore,
  handleTypingToStore,
  typing,
  handleLastMessage,
  deleteConversation,
  toggleAuth,
  setPublications,
  addPublication,
  user
}) => {
  const location = useLocation();
  const history = useHistory();
  // в корневом элементе делаем запрос на все беседы,
  // чтобы юзер при загрузке увидел их список
  useEffect(() => {
    axios.get("/conversations").then(({ data }) => handleConversations(data));
    axios.get("/publications").then(({ data }) => setPublications(data));
  }, []);

  useEffect(() => {
    const data = userAuthHandler();
    if (data && !user) {
      handleUserToStore(data);
    }
  }, [user]);

  const handleTyping = ({ typing }) => {
    console.log("handleTyping pre");
    const { id } = typing.conversation;
    if (!location.pathname.includes(`room/${id}`)) return;

    console.log("handleTyping POST");

    const { text, author } = typing;
    handleTypingToStore(text, author);
  };

  const handleFinished = ({ finished }) => {
    const { id, publication } = finished;
    addPublication(publication);
    deleteConversation(id);

    if (!location.pathname.includes(`room/${id}`)) return;

    history.push(`/project/${publication.id}`);
  };

  const handleReceivedMessage = res => {
    if (res.hasOwnProperty("typing")) return handleTyping(res);

    console.log("HERE!&&!&!!@#!");
    const { message } = res;
    const { text, author } = message;
    let conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    updateConversations(conversation);
    const lastWord = text.split(" ").pop();
    handleLastMessage(lastWord, author);
  };

  const handleReceivedConversation = response => {
    console.log("handleReceivedConversation", response);
    if (response.hasOwnProperty("finished")) return handleFinished(response);
    const { conversation } = response;
    addConversation(conversation);
  };

  return (
    <>
      <ActionCableContainer
        handleReceivedConversation={handleReceivedConversation}
        handleReceivedMessage={handleReceivedMessage}
        conversations={conversations}
      />
      <Menubar />
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/project/:id" component={ProjectPage} />
        <Route
          path="/rooms/"
          exact
          render={props => (
            <ConversationListPage {...props} conversations={conversations} />
          )}
        />
        <Route
          path="/room/:rid"
          render={props => (
            <ConversationPage {...props} conversations={conversations} />
          )}
        />
        <Redirect to="/about" />
      </Switch>
    </>
  );
};

// подключаем state редаксa и экшены к пропсам компонента
const mapStateToProps = ({
  user,
  conversations,
  conversation: { typing }
}) => ({
  conversations,
  typing,
  user
});
// возвращает объект с пропсом handleConversations, который есть функция,
// которая диспатчит экшн, payload которой есть data
const mapDispatchToProps = dispatch => ({
  handleConversations: data => dispatch(setConversations(data)),
  setActiveConversation: id => dispatch(setConversation(id)),
  updateConversations: conversation =>
    dispatch(updateConversations(conversation)),
  addConversation: conversation => dispatch(addConversation(conversation)),
  handleUserToStore: data => dispatch(setUser(data)),
  handleTypingToStore: (text, author) => dispatch(setTyping(text, author)),
  handleLastMessage: (text, author) => dispatch(setLastMessage(text, author)),
  deleteConversation: id => dispatch(deleteConversation(id)),
  toggleAuth: bool => dispatch(toggleAuth(bool)),
  setPublications: data => dispatch(setPublications(data)),
  addPublication: pub => dispatch(addPublication(pub))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
