
import Product from "../Product/Product";
import Loading from "../Loading/Loading";
import useApidata from "../../Hooks/useApidata";

export default function ProductItem() {

    let {data,isLoading,isError,error} = useApidata("https://ecommerce.routemisr.com/api/v1/products","products")
     
        
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
  return (  
    <div className="container  lg:p-24 lg:pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.data?.data?.length? data?.data?.data?.map((prod=><Product key={prod.id} prod={prod}></Product>)):""}
        </div>
    </div>
  )
}
