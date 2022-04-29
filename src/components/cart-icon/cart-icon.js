import React, { useContext } from "react";

import { CartContext } from "../../context/cart.context";

import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

const CartIcon = () => {
  const { toggleIsCartVisible } = useContext(CartContext);

  return (
    <div className="cart-icon-container" onClick={toggleIsCartVisible}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
