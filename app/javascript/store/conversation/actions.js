import { createAction } from "redux-act";

// export const addConversation = createAction("Add new conversation");
export const setConversation = createAction("Set active conversation");
export const setLastMessage = createAction(
  "Set last message",
  (text, author) => ({
    text,
    author
  })
);
export const setTyping = createAction("Set active typing", (text, author) => ({
  text,
  author
}));
