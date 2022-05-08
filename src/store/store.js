import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
// import thunk from "redux-thunk";

import { rootSaga } from "./root-saga";

import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root", // persist everything, starting from root level
  storage, // this will be local storage
  // blacklist: ["user"], // this is array of reducers i don't want to store in my local storage
  whitelist: ["cart"], // save only cart reducer to the local storage
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// use logger middleware only when in development mode; filter(Boolean) will remove falsy values from array
// here i can put any middleware i need (logger, think, saga)
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  sagaMiddleware,
].filter(Boolean);

// const thunkMiddleware = (store) => (next) => (action) => {
//   if (typeof action === "function") {
//     action(dispatch);
//   }
// };

// if we're not in production, have access to window and redux devtools exists, use this compose; otherwise use compose from redux
const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer,
  undefined,
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
