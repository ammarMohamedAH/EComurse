import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

async function processPayment({ cartId, shippingAddress }) {
  const token = localStorage.getItem("token");

  if (!token) {
    toast.error("Authentication error! Please log in again.");
  }

  try {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-comurse-git-main-ammarmohamed01210gmailcoms-projects.vercel.app/`,
      { shippingAddress },
      { headers: { token } }
    );

    if (!response.data || !response.data.session || !response.data.session.url) {
      toast.error("Invalid response from server. Please try again.");
    }

    return response.data;
  } catch (error) {
    console.error("Payment Error:", error);
    toast.error(error?.response?.data?.message || "Failed to process payment!");
    throw error; 
  }
}

export default function usePayment() {
  return useMutation({
    mutationFn: processPayment,
    onSuccess: (data) => {
      toast.success("Payment initiated successfully!");
      window.location.href = data.session.url;
    },
    onError: (error) => {
      toast.error("Payment failed! Please try again.");
    },
  });
}
