import React, { useEffect, useState } from "react";
import { ActionCable } from "react-actioncable-provider";
import axios from "axios";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
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
  activeConversation,
  handleUserToStore,
  user,
  handleTypingToStore,
  typing,
  handleLastMessage,
  deleteConversation
}) => {
  // в корневом элементе делаем запрос на все беседы,
  // чтобы юзер при загрузке увидел их список
  useEffect(() => {
    axios.get("/conversations").then(({ data }) => handleConversations(data));
    const data = userAuthHandler();
    handleUserToStore(data);
  }, []);

  const handleTyping = ({ typing }) => {
    const { id } = typing.conversation;
    if (id !== activeConversation) return;

    const { text, author } = typing;
    handleTypingToStore(text, author);
  };

  const handleReceivedMessage = res => {
    if (res.hasOwnProperty("typing")) return handleTyping(res);

    const { message } = res;
    const { text, author } = message;
    let conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    conversation.messages = [...conversation.messages, message];
    // conversation = { ...conversation };
    updateConversations(conversation);
    const lastWord = text.split(" ").pop();
    handleLastMessage(lastWord, author);
  };

  const handleReceivedConversation = response => {
    const { conversation } = response;
    addConversation(conversation);
  };

  const handleDelete = id => {
    axios.post("/deleteconversation", { id }).then(({ data }) => {
      if (data.message === "ok") {
        deleteConversation(id);
      }
    });
  };

  return (
    <Router>
      <ActionCableContainer
        handleReceivedConversation={handleReceivedConversation}
        handleReceivedMessage={handleReceivedMessage}
        conversations={conversations}
      />
      <Menubar />
      <Switch>
        <Route path="/about" component={AboutPage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/project/:pid" component={ProjectPage} />
        <Route
          path="/rooms/"
          exact
          render={props => (
            <ConversationListPage
              {...props}
              conversations={conversations}
              setActiveConversation={setActiveConversation}
              handleReceivedMessage={handleReceivedMessage}
              handleReceivedConversation={handleReceivedConversation}
              handleDelete={handleDelete}
            />
          )}
        />
        {activeConversation ? (
          <Route
            path="/room/:id"
            render={props => <ConversationPage {...props} />}
          />
        ) : null}
        <Redirect to="/about" />
      </Switch>
    </Router>
  );
};

// подключаем state редаксa и экшены к пропсам компонента
const mapStateToProps = ({
  conversations,
  conversation: { conversation, typing },
  user
}) => ({
  conversations,
  activeConversation: conversation,
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
  deleteConversation: id => dispatch(deleteConversation(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
