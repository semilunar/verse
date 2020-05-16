import { createReducer } from "redux-act";
import { setConversation, setTyping } from "./actions";

const initialState = { conversation: null, typing: {} };

export default createReducer(
  {
    [setConversation]: (state, payload) => ({
      ...state,
      conversation: payload
    }),
    [setTyping]: (state, { text, author }) => ({
      ...state,
      typing: { text, author }
    })
  },
  initialState
);
