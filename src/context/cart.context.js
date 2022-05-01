import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

// helper functions for adding/deleting items to cart
const addCartItem = (cartItems, productToAdd) => {
  if (cartItems.some((item) => item.id === productToAdd.id)) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCardItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export const CartContext = createContext({
  isCartVisible: false,
  toggleIsCartVisible: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  clearItemFromCart: () => {},
  totalPrice: 0,
  removeItemFromCart: () => {},
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  TOGGLE_IS_CART_VISIBLE: "TOGGLE_IS_CART_VISIBLE",
};

const initialState = {
  isCartVisible: false,
  cartItems: [],
  cartCount: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.TOGGLE_IS_CART_VISIBLE:
      return { ...state, isCartVisible: !state.isCartVisible };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isCartVisible, cartItems, cartCount, totalPrice } = state;

  const updateCartItemsReducer = (newCartItems) => {
    const newTotalPrice = newCartItems.reduce((acc, cartItem) => {
      return acc + cartItem.price * cartItem.quantity;
    }, 0);

    const newCartCount = newCartItems.reduce(
      (acc, cartItems) => acc + cartItems.quantity,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        totalPrice: newTotalPrice,
        cartCount: newCartCount,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCardItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const toggleIsCartVisible = () => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_IS_CART_VISIBLE));
  };

  const value = {
    isCartVisible,
    toggleIsCartVisible,
    cartItems,
    cartCount,
    totalPrice,
    addItemToCart,
    clearItemFromCart,
    removeItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
