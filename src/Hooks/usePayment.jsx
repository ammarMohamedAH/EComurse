import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function processPayment({ cartId, shippingAddress }) {

  
    return await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      { shippingAddress },
      { headers: { token:localStorage.getItem('token') } }
    );

    
 
}

export default function usePaymentMutation() {
  return useMutation({
    mutationFn: processPayment,
  
  });
}
