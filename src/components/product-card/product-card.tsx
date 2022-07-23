import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button";

import { ProductCartContainer, Footer, Name } from "./product-card.styles";

import { CategoryItem } from "../../store/categories/categories.types";

type ProductCardProps = {
  product: CategoryItem
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, imageUrl } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <span>${price}</span>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.INVERTED}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;
