import { createAction } from "redux-act";

// export const addConversation = createAction("Add new conversation");
export const setConversation = createAction("Set active conversation");
export const setTyping = createAction("Set active typing", (text, author) => ({
  text,
  author
}));
