import { AnyAction } from "redux";

import { toggleCartVisible, setCartItems } from "./cart.action";
import { CartItem } from "./cart.types";

export type CartState = {
  readonly isCartVisible: boolean;
  readonly cartItems: CartItem[];
};

const initialState: CartState = {
  isCartVisible: false,
  cartItems: [],
};

export const cartReducer = (
  state = initialState,
  action: AnyAction
): CartState => {
  if (toggleCartVisible.match(action)) {
    return { ...state, isCartVisible: !state.isCartVisible };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;

  // switch (action.type) {
  //   case CART_ACTION_TYPES.SET_CART_ITEMS:
  //     return {
  //       ...state,
  //       cartItems: action.payload,
  //     };
  //   case CART_ACTION_TYPES.TOGGLE_IS_CART_VISIBLE:
  //     return { ...state, isCartVisible: !state.isCartVisible };
  //   default:
  //     return state;
  // }
};
