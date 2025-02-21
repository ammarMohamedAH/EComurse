import React, { useContext, useEffect, useState } from "react";
import useQueryCart, { getCart } from "../../Hooks/useQueryCart";
import Loading from "./../Loading/Loading";
import useMutationDel, { clearCart, deleteItemFromCart, updateCount } from "../../Hooks/useMutationDel";
import img from "../../assets/empty-cart-yellow - Copy.png";
import Payment from "../Paymet/Payment";
import { CartContext } from "../../context/CarContext";
import toast from "react-hot-toast";

export default function Cart() {
  const { setNumOfItems } = useContext(CartContext);
  const { data, isLoading, isError, error } = useQueryCart(getCart);

  const { mutate, isPending } = useMutationDel(deleteItemFromCart);
  const { mutate: mutateClear, isPending: isPendingClear } = useMutationDel(clearCart);
  const { mutate: mutateCount, isPending: isPendingCount } = useMutationDel(updateCount);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data?.data?.numOfCartItems !== undefined) {
      setNumOfItems(data.data.numOfCartItems);
    }
  }, [data, setNumOfItems]);

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <div>
      {(isPending || isPendingClear || isLoading || isPendingCount) && <Loading />}

      <section className="py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Cart Shop</h2>

          {!data?.data?.numOfCartItems ? (
            <div className="w-full flex items-center justify-center">
              <img src={img} alt="empty cart" />
            </div>
          ) : (
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                <div className="space-y-6">
                  {data?.data?.data?.products.map((prod) => (
                    <div key={prod.product._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <img className="h-24 w-24 dark:hidden max-w-full" src={prod.product.imageCover} alt={prod.product.title} />

                        <div className="flex items-center">
                          <button
                            onClick={() => {
                              if (prod.count > 1) {
                                mutateCount({ productId: prod.product._id, count: prod.count - 1 });
                              }
                            }}
                            type="button"
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                            disabled={isPendingCount || prod.count <= 1}
                          >
                            -
                          </button>

                          <input type="text" className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white" disabled value={prod.count} />

                          <button
                            onClick={() => mutateCount({ productId: prod.product._id, count: prod.count + 1 })}
                            type="button"
                            className="inline-flex h-5 w-5 items-center justify-center rounded-md border bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
                            disabled={isPendingCount}
                          >
                            +
                          </button>
                        </div>

                        <div className="text-end md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">${prod.price}</p>
                        </div>

                        <div className="w-full min-w-0 flex-1 md:max-w-md">
                          <p className="text-base font-medium text-gray-900 hover:underline dark:text-white">{prod.product.title}</p>
                          <button
                            type="button"
                            className="text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                            onClick={() => mutate(prod.product._id)}
                            disabled={isPending}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-center">
                    <button
                      onClick={mutateClear}
                      className="rounded-md border-green-500 border px-4 py-2 text-lg text-gray-700"
                      disabled={isPendingClear}
                    >
                      {isPendingClear ? "Clearing..." : "Clear Your Cart"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                  <div className="space-y-4">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total price</dt>
                      <dd className="text-base font-medium text-green-500 dark:text-white">${data.data.data.totalCartPrice}</dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Total items</dt>
                      <dd className="text-base font-medium text-green-500 dark:text-white">{data?.data?.numOfCartItems}</dd>
                    </dl>
                  </div>

                  <button
                    className="text-white bg-green-700 px-5 py-2.5 rounded-lg"
                    onClick={() => setIsOpen(!isOpen)}
                    disabled={isPending || isPendingClear || isPendingCount}
                  >
                    {isOpen ? "Hide Payment" : "Proceed to Checkout"}
                  </button>

                  {isOpen && <Payment cartId={data?.data?.cartId} />}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
