import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import useApidata from "../../Hooks/useApidata";
import { useState } from "react";
import { Helmet } from "react-helmet";

export default function ProductItem() {

    let {data,isLoading,isError,error} = useApidata("https://ecommerce.routemisr.com/api/v1/products","products")
    const [search, setsearch] = useState("");
     
        
    if(isLoading)
    return <Loading></Loading>

    if(isError){
        return (
            <div className="container">
        <div className="flex flex-wrap">
        <div className="w-full text-center font-semibold mt-2">{error.message}</div>
        </div>
    </div>
        )
        
    }
    
    const filteredProducts = data?.data?.data.filter((prod) =>
        prod?.title?.toLowerCase().includes(search.toLowerCase())
      );
      
  return (  
    <div className="container  lg:p-24 lg:pt-10">
        
    <Helmet>
                  <title>Product</title>
                </Helmet>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block  p-2 ps-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full mb-4 rounded-lg" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search..."  />
        
    </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts?.length? filteredProducts?.map((prod)=><Product key={prod.id} prod={prod}></Product>)
            :""}
            {data?.data?.data?.length && !search? data?.data?.data?.map((prod=><Product key={prod.id} prod={prod}></Product>)):""}
        </div>
    </div>
  )
}
