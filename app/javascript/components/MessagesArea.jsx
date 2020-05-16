import React from "react";
import { connect } from "react-redux";

import NewMessageForm from "./NewMessageForm";

const MessagesArea = ({ conversation: { id, title, messages }, user }) => {
  console.log("MessagesArea", messages);
  return (
    <div className="messagesArea">
      <h2 className="conversation-title">{title}</h2>
      <ul className="messages-list">{orderedMessages(messages, user)}</ul>
      <NewMessageForm conversation_id={id} />
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
        <p className={`message-text ${message.author === user ? "" : "blur"}`}>
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
  activeConversation: conversation,
  user
});

export default connect(mapStateToProps)(MessagesArea);
// <span className="message-text">
//   {new Date(message.created_at).toLocaleTimeString()}
// </span>
