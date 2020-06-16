import React from "react";
import { ActionCable } from "react-actioncable-provider";

export default ({
  handleReceivedConversation,
  handleReceivedMessage,
  conversations
}) => (
  <>
    <ActionCable
      channel={{ channel: "ConversationsChannel" }}
      onReceived={handleReceivedConversation}
    />
    {conversations.length > 0 &&
      conversations.map(c => (
        <ActionCable
          key={c.id}
          channel={{
            channel: "MessagesChannel",
            conversation: c.id
          }}
          onReceived={handleReceivedMessage}
          // onReceived={res =>
          //   console.log("!!!---!!!---!!!", res, "!!!---!!!---!!!")
          // }
        />
      ))}
  </>
);
