import { createReducer } from "redux-act";
import { toggleAuth } from "./actions";

const initialState = { auth: false };

export default createReducer(
  {
    [toggleAuth]: (state, payload) => ({ ...state, auth: payload })
  },
  initialState
);
