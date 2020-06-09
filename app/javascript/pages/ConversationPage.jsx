import React, { useEffect } from "react";
import { connect } from "react-redux";

import NewMessageForm from "../components/NewMessageForm";
import needBlur from "../helpers/needBlur";
import setTitle from "../helpers/setTitle";
import stringToColor from "../helpers/stringToColor";

const ConversationPage = ({ conversation, user, typing }) => {
  useEffect(() => {
    if (conversation) {
      setTitle(conversation.title);
    }
  }, [conversation]);

  if (!conversation) return null;

  const { id, title, messages } = conversation;
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
          {typing.text && typing.author !== user && (
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

      <button>Publish (0/0)</button>
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
          style={{ backgroundColor: stringToColor(message.author.slice(-20)) }}
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
  conversation: { conversation, typing },
  user
}) => ({
  conversation: conversations.find(c => c.id === conversation),
  typing,
  activeConversation: conversation,
  user
});

export default connect(mapStateToProps)(ConversationPage);
