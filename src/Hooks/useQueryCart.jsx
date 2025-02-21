import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


export function getCart() {
  const token = localStorage.getItem('token'); 
  return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
    headers: { token },
  }).then(response => response)
   
    
}

export default function useQueryCart() {
  return useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });
}
