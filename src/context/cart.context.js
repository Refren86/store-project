import { createContext, useState } from "react";

export const CartContext = createContext({
  isVisible: false,
  toggleVisible: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleIsCartVisible = () => {
    setIsCartVisible((prev) => !prev);
  };

  const value = { isCartVisible, toggleIsCartVisible };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
