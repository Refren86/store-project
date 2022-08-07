import { FC, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCartItems } from "../../store/cart/cart.selector";
import {
  clearItemsFromCart,
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";

import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles";

import { CartItem as TCartItem } from "../../store/cart/cart.types";

type CartItemProps = {
  cartItem: TCartItem;
};

const CheckoutItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { name, quantity, imageUrl, price } = cartItem;

  const clearItemHandler = () =>
    dispatch(clearItemsFromCart(cartItems, cartItem));
  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>

      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>

        <Value>{quantity}</Value>

        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>${price}</BaseSpan>

      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
});

export default CheckoutItem;
