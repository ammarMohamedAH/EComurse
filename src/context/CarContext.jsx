import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  let [numOfItems, setNumOfItems] = useState(0);

  async function getNumOfItems() {
    try {
      let token = localStorage.getItem("token");
      if (!token) return; 
      let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token },
      });

      if (data?.numOfCartItems !== undefined) {
        setNumOfItems(data.numOfCartItems);
      }
      return data;
    } catch (error) {
      console.error("Error fetching cart items:", error.response?.data || error.message);
    }
  }

  useEffect(() => {
    getNumOfItems();
  }, []); 

  return (
    <CartContext.Provider value={{ getNumOfItems, numOfItems, setNumOfItems }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
