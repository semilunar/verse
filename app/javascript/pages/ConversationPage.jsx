import React from "react";
import { connect } from "react-redux";

import NewMessageForm from "../components/NewMessageForm";
import needBlur from "../helpers/needBlur";
import stringToColor from "../helpers/stringToColor";

const ConversationPage = ({ conversation, user, typing }) => {
  if (!conversation) return null;

  console.log("---typing---", typing);
  const { id, title, messages } = conversation;
  return (
    <div className="conversation-page">
      <div className="conversation-area">
        <h2 className="conversation-title">{title}</h2>
        <ul className="messages-list">
          {orderedMessages(messages, user)}
          {typing.text && typing.author !== user && (
            <li className="message-wrap">
              <div
                className="author-avatar"
                style={{ backgroundColor: stringToColor(typing.author) }}
              />
              <p className="messages-typing message-text blur">{typing.text}</p>
            </li>
          )}
        </ul>
        <NewMessageForm conversation_id={id} />
      </div>
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
          style={{ backgroundColor: stringToColor(message.author) }}
        />
        <p className={`message-text ${needBlur(message.author, user)}`}>
          {message.text}
        </p>
      </li>
    );
  });
};
const mapStateToProps = ({
  conversations,
  active: { conversation, typing },
  user
}) => ({
  conversation: conversations.find(c => c.id === conversation),
  typing,
  activeConversation: conversation,
  user
});

export default connect(mapStateToProps)(ConversationPage);
