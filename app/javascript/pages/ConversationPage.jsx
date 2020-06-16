import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ActionCable } from "react-actioncable-provider";

import { toggleAuth, toggleConfirmPublish } from "../store/togglers/actions";
import { deleteConversation } from "../store/conversations/actions";

import NewMessageForm from "../components/NewMessageForm";
import needBlur from "../helpers/needBlur";
import setTitle from "../helpers/setTitle";
import stringToColor from "../helpers/stringToColor";
import getMessageAuthor from "../helpers/getMessageAuthor";

const ConversationPage = ({
  handleReceivedMessage,
  conversations,
  user,
  typing,
  deleteConversation,
  toggleAuth,
  toggleConfirmPublish,
  match: {
    params: { rid }
  }
}) => {
  const history = useHistory();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    if (!conversation) {
      handleOpenPage();
    }

    return () => setTitle("Verse — A Massage To You");
  }, [rid, conversations]);

  useEffect(() => {
    if (!user) {
      toggleAuth(true);
    } else {
      toggleAuth(false);
    }
  }, [user]);

  const handleOpenPage = () => {
    const conv = conversations.find(c => c.id == rid);
    if (conv) {
      setConversation(conv);
      setTitle(conv.title);
    } else {
      setConversation(false);
    }
  };

  const handlePublish = e => {
    e.preventDefault();

    const { id } = conversation;
    toggleConfirmPublish({ conversation_id: id, author: user.id });
  };
  if (conversation === false) return <h2>Not found...</h2>;
  if (!conversation) return <h2>Loading...</h2>;

  if (!user) return <h2>Enter user credits...</h2>;

  const { id, title, messages, author } = conversation;
  return (
    <div className="conversation-page">
      <div className="conversation-area">
        <h2
          className="conversation-title"
          style={{ background: stringToColor((id * 9e9).toString()) }}
        >
          {title}
        </h2>

        <ul className="messages-list">
          {orderedMessages(messages, user)}
          {typing.text && typing.author !== user.id && (
            <li className="message-wrap">
              <div
                className="author-avatar"
                style={{
                  backgroundColor: stringToColor(typing.author.slice(-20))
                }}
              />
              <p className="messages-typing message-text blur">{typing.text}</p>
            </li>
          )}
        </ul>

        <NewMessageForm conversation_id={id} />
      </div>

      {author === user.id && <button onClick={handlePublish}>Publish</button>}
    </div>
  );
};

const orderedMessages = (messages, user) => {
  const sortedMessages = messages.sort(
    (a, b) => new Date(a.created_at) - new Date(b.created_at)
  );

  return sortedMessages.map(message => {
    return (
      <li className="message-wrap" key={message.id}>
        <div
          className="author-avatar"
          style={{
            backgroundColor: stringToColor(
              getMessageAuthor(message, 0).slice(-20)
            )
          }}
        />
        <div className="nickname">{getMessageAuthor(message, 1)}</div>
        <p
          className={`message-text ${needBlur(
            getMessageAuthor(message, 0),
            user.id
          )}`}
        >
          {message.text}
        </p>
      </li>
    );
  });
};

const mapStateToProps = ({
  conversations,
  conversation: { typing },
  user
}) => ({
  typing,
  conversations,
  user
});

const mapDispatchToProps = dispatch => ({
  toggleAuth: bool => dispatch(toggleAuth(bool)),
  toggleConfirmPublish: bool => dispatch(toggleConfirmPublish(bool)),
  deleteConversation: id => dispatch(deleteConversation(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationPage);
