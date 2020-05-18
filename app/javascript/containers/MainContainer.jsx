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
  addConversation
} from "../store/conversations/actions";
import { setConversation, setTyping } from "../store/active/actions";
import { setUser } from "../store/user/actions";

import AboutPage from "../pages/AboutPage";
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
  handleTypingToStore
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
    let conversation = conversations.find(
      conversation => conversation.id === message.conversation_id
    );
    console.log("new message", message);
    conversation.messages = [...conversation.messages, message];
    conversation = { ...conversation };
    updateConversations(conversation);
  };

  const handleReceivedConversation = response => {
    const { conversation } = response;
    addConversation(conversation);
  };

  return (
    <Router>
      <ActionCableContainer
        handleReceivedConversation={handleReceivedConversation}
        handleReceivedMessage={handleReceivedMessage}
        conversations={conversations}
      />
      <Switch>
        <Route path="/about" component={AboutPage} />
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
            />
          )}
        />
        {activeConversation ? (
          <Route
            path="/room/:id"
            render={props => <ConversationPage {...props} />}
          />
        ) : null}
        <Redirect to="/rooms" />
      </Switch>
    </Router>
  );
};

// подключаем state редаксa и экшены к пропсам компонента
const mapStateToProps = ({
  conversations,
  active: { conversation, typing },
  user
}) => ({
  conversations,
  activeConversation: conversation,
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
  handleTypingToStore: (text, author) => dispatch(setTyping(text, author))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainContainer);
