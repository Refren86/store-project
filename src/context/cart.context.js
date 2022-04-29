import { createContext, useState, useEffect } from "react";

// helper function for adding items to cart
const addCartItem = (cartItems, productToAdd) => {
  let newArray = [];
  if (cartItems.some((item) => item.id === productToAdd.id)) {
    newArray = cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    newArray = [...cartItems, { ...productToAdd, quantity: 1 }];
  }

  return newArray;
};

export const CartContext = createContext({
  isVisible: false,
  toggleVisible: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce((acc, cartItems) => acc + cartItems.quantity, 0)
    );
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const toggleIsCartVisible = () => {
    setIsCartVisible((prev) => !prev);
  };

  const value = {
    isCartVisible,
    toggleIsCartVisible,
    cartItems,
    addItemToCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
