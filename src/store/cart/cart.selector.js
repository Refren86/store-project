import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

// remembers the array of items in cart
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// remembers whether cart is opened
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartVisible
);

// remembers cart items count
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, cartItems) => acc + cartItems.quantity, 0)
);

// remembers cart total price
export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((acc, cartItem) => {
      return acc + cartItem.price * cartItem.quantity;
    }, 0)
);
