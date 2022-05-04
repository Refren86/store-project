export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("current state: ", store.getState());

  next(action); // will pass action and update store

  console.log("next state: ", store.getState());
};
