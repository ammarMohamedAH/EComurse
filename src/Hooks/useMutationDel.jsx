import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export async function deleteItemFromCart(productId) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { headers: { token } }
    );

    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function clearCart() {
  try {
    const token = localStorage.getItem("token");
   const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers: { token },
    });

    return response;
  } catch (error) {
    console.error(error);

  }
}

export async function updateCount({ productId, count }) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
      { count },
      { headers: { token } }
    );

    return response;
  } catch (error) {
    console.error(error);
   
  }
}


export default function useMutationDel(mutationFn) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cartData"]);
      
    },
    
  });
}
