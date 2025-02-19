import React from 'react'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";



export default function useNumberOfItem() {
    function getData() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:{
            token: localStorage.getItem('token')
        }});
      }
    
      return useQuery({
        queryKey: ["cartNumber"],
        queryFn: getData,
      });
}
