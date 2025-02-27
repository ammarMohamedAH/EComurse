import { createContext, useContext, useEffect, useState } from "react";

const WishContext = createContext();

export const useWish = () => useContext(WishContext);
export const WishProvider = ({ children }) => {
  const [WishItems, setWishItems] = useState(0);
  const [WishMatrix, setWishMatrix] = useState([]);
  const fetchWish = async () => {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: { token: localStorage.getItem("token") },
      });
      const data = await res.json();
      setWishItems(data?.count || 0); 
      setWishMatrix(data?.data || []);
      
    } catch (error) {
      console.error(error);
    }
  };

 
  useEffect(() => {
    updateWish();
  }, []);
  
  const updateWish = () => {
    fetchWish();
  };
  return (
    <WishContext.Provider value={{ WishItems, updateWish, WishMatrix }}>
      {children}
    </WishContext.Provider>
  );
};