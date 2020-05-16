import React, { useEffect, useState } from "react";
import axios from "axios";
import { ActionCable } from "react-actioncable-provider";
import { connect } from "react-redux";
import store from "../store";
import {
  setConversations,
  updateConversations,
  addConversation
} from "../store/conversations/actions";
import { setConversation, setTyping } from "../store/active/actions";
import { setUser } from "../store/user/actions";

import NewConversationForm from "../components/NewConversationForm";
import MessagesArea from "../components/MessagesArea";
import userAuthHandler from "../helpers/userAuthHandler";

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
    <div className="main-container">
      <NewConversationForm />
      <h2 className="header">Or join an existing one:</h2>
      <ActionCable
        channel={{ channel: "ConversationsChannel" }}
        onReceived={handleReceivedConversation}
      />
      <ul className="conversation-list">
        <div className="conversation-list-items">
          {conversations.length > 0 &&
            conversations.map(c => (
              <li
                key={c.id}
                onClick={() => setActiveConversation(c.id)}
                className="conversation-item"
              >
                <ActionCable
                  key={c.id}
                  channel={{
                    channel: "MessagesChannel",
                    conversation: c.id
                  }}
                  onReceived={handleReceivedMessage}
                />
                {c.title}
              </li>
            ))}
        </div>
        {activeConversation ? <MessagesArea /> : null}
      </ul>
    </div>
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
