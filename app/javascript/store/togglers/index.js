import { createReducer } from "redux-act";
import { toggleAuth, toggleConfirmPublish } from "./actions";

const initialState = { auth: false, confirmPublish: false };

export default createReducer(
  {
    [toggleAuth]: (state, payload) => ({ ...state, auth: payload }),
    [toggleConfirmPublish]: (state, payload) => ({
      ...state,
      confirmPublish: payload
    })
  },
  initialState
);
