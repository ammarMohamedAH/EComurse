import React from "react";
import useApidata from "./../../Hooks/useApidata";
import Loading from "../Loading/Loading";

export default function Brands() {
  let { data, isError, error, isLoading } = useApidata(
    "https://ecommerce.routemisr.com/api/v1/brands",
    "brands"
  );

  if (isLoading) return <Loading></Loading>;

  if (isError) {
    return (
      <div className="container">
        <div className="flex flex-wrap">
          <div className="w-full text-center font-semibold mt-2">
            {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container px-28 text-center py-10"
      
    >
      <h2 className="text-green-600 text-[40px] font-semibold pb-10">
        All Brands
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data?.data?.map((prod, index) => (
          <button className="text-center product rounded-lg p-4 border overflow-hidden transition duration-200 group" data-modal-target="small-modal"
          data-modal-toggle="small-modal"
           type="button">
            <img src={prod.image} alt={prod.name} />
            <p className=" text-lg">{prod.name}</p>
            
          </button>
        ))}
      </div>

    </div>
  );
}
