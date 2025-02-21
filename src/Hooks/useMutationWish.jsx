import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function addToWish(productId) {
  return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId },
      {
        headers: {
          token: localStorage.getItem("token"), 
        },
      }
    )
    .then((response) => response) 
    .catch((error) => {console.error(error);});
}

export default function useMutationWish(fn) {
  return useMutation({
    mutationFn: fn,
  });
}
