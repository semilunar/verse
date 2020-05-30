import { createReducer } from "redux-act";
import { setConversation, setTyping, setLastMessage } from "./actions";

const initialState = { conversation: null, typing: {}, lastMessage: null };

export default createReducer(
  {
    [setConversation]: (state, payload) => ({
      ...state,
      conversation: payload
    }),
    [setTyping]: (state, { text, author }) => ({
      ...state,
      typing: { text, author }
    }),
    [setLastMessage]: (state, { text, author }) => ({
      ...state,
      lastMessage: { text, author }
    })
  },
  initialState
);
