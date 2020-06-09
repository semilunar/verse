import { createAction } from "redux-act";

export const addConversation = createAction("Add new conversation");
export const setConversations = createAction("Set conversations");
export const updateConversations = createAction("Update conversation");
export const deleteConversation = createAction("Delete conversation");
