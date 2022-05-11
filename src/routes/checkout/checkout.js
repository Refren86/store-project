import React from "react";
import { useSelector } from "react-redux";

import CheckoutItem from "../../components/checkout-item/checkout-item";
import PaymentForm from "../../components/payment-form/payment-form";

import {
  selectCartItems,
  selectCartTotalPrice,
} from "../../store/cart/cart.selector";

import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  CheckoutTotal,
} from "./checkout.styles";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>

        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>

      {cartItems.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}

      <CheckoutTotal>Total: ${totalPrice}</CheckoutTotal>

      <PaymentForm />
    </CheckoutContainer>
  );
};

export default Checkout;
