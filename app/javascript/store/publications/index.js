import { createReducer } from "redux-act";
import { addPublication, setPublications } from "./actions";

const initialState = [];

export default createReducer(
  {
    [setPublications]: (state, payload) => [...payload],
    [addPublication]: (state, payload) => [payload, ...state]
  },
  initialState
);
