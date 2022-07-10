import { CategoryItem } from "../categories/categories.types";

export enum CART_ACTION_TYPES {
  TOGGLE_IS_CART_VISIBLE = "cart/TOGGLE_IS_CART_VISIBLE",
  SET_CART_ITEMS = "cart/SET_CART_ITEMS",
}

export type CartItem = CategoryItem & { quantity: number };
