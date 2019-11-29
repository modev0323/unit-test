import { createStore, applyMiddleware } from "redux";

// Logger with default options
import logger from "redux-logger";

import rootReducer from "./redux";

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, applyMiddleware(logger));
  return store;
}