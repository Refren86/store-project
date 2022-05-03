import { CART_ACTION_TYPES } from "./cart.types";

const initialState = {
  isCartVisible: false,
  cartItems: [],
};

export const cartReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: payload,
      };
    case CART_ACTION_TYPES.TOGGLE_IS_CART_VISIBLE:
      return { ...state, isCartVisible: !state.isCartVisible };
    default:
      return state;
  }
};
