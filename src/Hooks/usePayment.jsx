import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';


async function processPayment({ cartId, shippingAddress }) {
  const token = localStorage.getItem("token"); 
  try {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-comurse-git-main-ammarmohamed01210gmailcoms-projects.vercel.app/`,
      { shippingAddress },
      { headers: { token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    
  }
}


export default function usePayment() {
  return useMutation({
    mutationFn: processPayment,
    onSuccess: (data) => {
      toast.success("Payment initiated successfully!");
      window.location.href = data.session.url; 
    },
    
  });
}
