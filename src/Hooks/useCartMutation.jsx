import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export async function addToCart(productId) {
  try {
    const token = localStorage.getItem("token"); 
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { productId },
      { headers: { token } }
    );

    return response; 
  } catch (error) {
    console.error(error);

  }
}

export default function useCartMutation() {
  return useMutation({
    mutationFn: addToCart,
  
  });
}
