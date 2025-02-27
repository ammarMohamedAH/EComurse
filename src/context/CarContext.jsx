import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(0); 
  const fetchCart = async () => {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("token") },
      });
      const data = await res.json();
      setCartItems(data.numOfCartItems || 0); 
    } catch (error) {
      console.error(error);
    }
  };

 
  useEffect(() => {
    fetchCart();
  }, []);

  
  const updateCart = () => {
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ cartItems, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};
