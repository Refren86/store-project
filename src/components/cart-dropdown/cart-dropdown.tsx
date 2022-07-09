import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { toggleCartVisible } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import Button from "../button/button";
import CartItem from "../cart-item/cart-item";

import {
  CartDropdownContainer,
  CartItems,
  CartMessage,
} from "./cart-dropdown.styles";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    dispatch(toggleCartVisible());
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
