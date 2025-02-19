import { useMutation } from "@tanstack/react-query";
import axios from "axios";


let token = localStorage.getItem("token");
export function addToWish(productId) {
    return axios.post(
      `https://ecommerce.routemisr.com/api/v1/wishlist`,
      { productId },
      {
        headers: {
          token,
        },
      }
    );
  }
export default function useMutationWish(fn) {
    return useMutation({ mutationFn:fn });
}


// export function addToCart(productId) {
//   return axios.post(
//     `https://ecommerce.routemisr.com/api/v1/cart`,
//     { productId },
//     {
//       headers: {
//         token,
//       },
//     }
//   );
// }

// export default function useCartMutation(fn) {
  
//   return useMutation({ mutationFn: fn });
// }
