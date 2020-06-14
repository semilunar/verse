import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import conversations from "./conversations/";
import conversation from "./conversation/";
import user from "./user/";
import togglers from "./togglers/";
import publications from "./publications/";

const rootReducer = combineReducers({
  conversations,
  conversation,
  user,
  togglers,
  publications
});

// мидлвар – посредник между пуском экшэна и диспатчем, обработкой действия
const middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  middleware.push(createLogger());
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
