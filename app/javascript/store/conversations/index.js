import { createReducer } from "redux-act";
import {
  setConversations,
  addConversation,
  updateConversations,
  deleteConversation
} from "./actions";

const initialState = [];

export default createReducer(
  {
    [setConversations]: (state, payload) => [...payload],
    [addConversation]: (state, payload) => [payload, ...state],
    [updateConversations]: (state, payload) =>
      state.map(conversation =>
        conversation.id === payload.id ? payload : conversation
      ),
    [deleteConversation]: (state, payload) =>
      state.filter(c => c.id !== payload)
  },
  initialState
);
