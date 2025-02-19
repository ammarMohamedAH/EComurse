import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function delWish(productId) {
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
}

export default function useMutationWishDel() {
  const queryClient = useQueryClient(); 

  return useMutation({
    mutationFn: delWish,
    onSuccess: () => {
      queryClient.invalidateQueries(["getWish"]); 
    },
  });
}
