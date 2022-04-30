import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../context/cart.context";

import Button from "../button/button";
import CartItem from "../cart-item/cart-item";

import {
  CartDropdownContainer,
  CartItems,
  CartMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const { cartItems, toggleIsCartVisible } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    toggleIsCartVisible();
    navigate("/checkout");
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
        ) : (
          <CartMessage>No items in cart</CartMessage>
        )}
      </CartItems>

      <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
    </CartDropdownContainer>
  );
};

export default CartDropdown;
