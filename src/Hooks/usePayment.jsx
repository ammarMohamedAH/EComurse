import axios from 'axios'


let token = localStorage.getItem("token");

export default function usePayment({cartId,shippingAddress}) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://e-comurse-git-main-ammarmohamed01210gmailcoms-projects.vercel.app/`,{shippingAddress},{headers:{
        token,
      }})
}
