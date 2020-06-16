import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { toggleAuth } from "../store/togglers/actions";

import NewMessageForm from "../components/NewMessageForm";
import needBlur from "../helpers/needBlur";
import setTitle from "../helpers/setTitle";
import stringToColor from "../helpers/stringToColor";
import getMessageId from "../helpers/getMessageId";

const ConversationPage = ({
  conversations,
  user,
  typing,
  deleteConversation,
  toggleAuth,
  match: {
    params: { rid }
  }
}) => {
  const history = useHistory();
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    if (!user) {
      console.log("SADFSDXCFSDX", user);
      toggleAuth(true);
    } else {
      toggleAuth(false);
    }
    if (conversation && conversation.finished) {
      console.log(
        "REDIRECT !!!!!_____!!_!!!____!!!!!_----!!!!!!_-----!!_-!_-!-sdaf REDIRECT"
      );
    } else if (!conversation) {
      handleOpenPage();
    }
  }, [rid, conversations, user]);

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

    axios
      .post("/publications", {
        conversation_id: id,
        author: user.id
      })
      .then(({ data }) => {
        if (data.message === "ok") {
          deleteConversation(id);
          history.push("/projects");
        }
      });
  };
  if (conversation === false) return <h2>Not found...</h2>;
  if (!conversation) return <h2>Loading...</h2>;

  if (!user) return <h2>Enter user credits...</h2>;

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
          {orderedMessages(messages, user.id)}
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

      <button onClick={handlePublish}>Publish</button>
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
            backgroundColor: stringToColor(getMessageId(message).slice(-20))
          }}
        />
        <p className={`message-text ${needBlur(getMessageId(message), user)}`}>
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
  toggleAuth: bool => dispatch(toggleAuth(bool))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationPage);
