import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useApidata(url, keyValue) {
  async function getData() {
    if (url) {
      
    try {
      const response = await axios.get(url);
      return response; 
    } catch (error) {
      console.error(error);
    }
  }
}

  return useQuery({
    queryKey: [keyValue], 
    queryFn: getData,
  });
}
