import React, { useContext, useEffect } from "react";
import useWishItem from "../../Hooks/useWishItem";
import useCartMutation, { addToCart } from "../../Hooks/useCartMutation";
import Loading from "../Loading/Loading";
import toast from "react-hot-toast";
import useMutationWishDel from "../../Hooks/useMutationWishDel";
import { CartContext } from "../../context/CarContext";

export default function Wishlist() {
  let { data, isError, error, isLoading } = useWishItem();

  useEffect(() => {
    if (isError) toast.error(error.message);
  }, [isError, error]);


  let {
    data: dataCar,
    isError: isErrorCart,
    isSuccess,
    mutate,
    error: errorCart,
    isPending,
  } = useCartMutation(addToCart);

  useEffect(() => {
    if (isSuccess) toast.success(dataCar?.data?.message);
    if (isErrorCart) toast.error(errorCart?.response?.data?.message);
  }, [isSuccess, isErrorCart, dataCar, errorCart]);

  let { setNumOfItems } = useContext(CartContext);

 
  useEffect(() => {
    if (dataCar?.data?.numOfCartItems !== undefined) {
      setNumOfItems(dataCar?.data?.numOfCartItems);
    }
  }, [dataCar, setNumOfItems]);

  let { mutate: mutateDel, isPending: isPendingDel } = useMutationWishDel();


  if (isLoading || isPending || isPendingDel) return <Loading />;

  return (
    <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
      <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
        <div className="space-y-6">
          {data?.data?.data?.length > 0 ? (
            data.data.data.map((prod) => (
              <div
                key={prod.id}
                className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 grid grid-cols-5 grid-rows-3 gap-4"
              >
                <img
                  className="h-full w-24 max-w-full row-span-3"
                  src={prod.imageCover}
                  alt={prod.title}
                />

                <div className="flex flex-col gap-3 justify-center align-middle row-span-3">
                  <p className="text-base font-medium text-gray-900 dark:text-white">
                    {prod.title}
                  </p>
                  <p className="text-base font-bold text-gray-900 dark:text-white">
                    {prod.price} $
                  </p>
                  <button
                    type="button"
                    className="inline-flex text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                    onClick={() => mutateDel(prod.id)}
                    disabled={isPendingDel}
                  >
                    <svg
                      className="me-1.5 h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                    Remove
                  </button>
                </div>

                <button
                  onClick={() => mutate(prod.id)}
                  className="text-white text-sm px-10 py-2 bg-[#4fa74f] rounded-md transition col-start-5 row-start-2 mr-4"
                  disabled={isPending}
                >
                  <i className="fa-solid fa-plus"></i> Add
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No items in wishlist
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
