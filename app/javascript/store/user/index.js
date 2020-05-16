import { createReducer } from "redux-act";
import { setUser, removeUser } from "./actions";

const initialState = null;

export default createReducer(
  {
    [setUser]: (state, payload) => (state = payload),
    [removeUser]: (state, payload) => (state = null)
  },
  initialState
);
