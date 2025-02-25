import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function processPayment({ cartId, shippingAddress }) {

  
    return await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-comurse-git-main-ammarmohamed01210gmailcoms-projects.vercel.app`,
      { shippingAddress },
      { headers: { token:localStorage.getItem('token') } }
    );

    
 
}

export default function usePaymentMutation() {
  return useMutation({
    mutationFn: processPayment,
  
  });
}
