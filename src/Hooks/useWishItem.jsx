import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

function getWish() {
  return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: {
      token: localStorage.getItem("token"),
    },
  });
}
export default function useWishItem() {
  return useQuery({queryFn:getWish , queryKey:['getWish']})
}
