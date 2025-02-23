import React from "react";
import useApidata from "./../../Hooks/useApidata";

export default function Allorders() {
  const token = localStorage.getItem("token");

  const decodedToken = JSON.parse(atob(token.split(".")[1]));
  const userId = decodedToken?.id;
  let { data, isError, error, isLoading } = useApidata(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
    "Alloreder"
  );


  return (
    <div className="container">
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        {data?.data?.map((order) => (
          <form
            key={order.id}
            action="#"
            className="mx-auto max-w-screen-xl px-4 2xl:px-0 border rounded-xl mb-5 p-5"
          >
            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
              <div className="flex flex-col min-w-0 flex-1 gap-4">
              {order.cartItems.map((prod)=>(
                <div className="min-w-0 flex-1 space-y-8" key={prod._id}>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                  <div className="space-y-4  flex items-center flex-col md:flex-row justify-center md:justify-between md:gap-6 md:space-y-0">
                    <img
                      className="h-24 w-24 dark:hidden max-w-full align-middle"
                      src={prod.product.imageCover}
                      alt={prod.product.title}
                    />

                    <div className="flex items-center flex-row-reverse gap-4 justify-center">
                      <div className="md:w-32 text-left">
                        <p className=" font-bold text-green-500 dark:text-white text-base">
                        Price: ${prod.price}
                        </p>
                        <p className=" font-bold text-green-500 dark:text-white text-base">
                        Quantity: {prod.count}
                        </p>
                      </div>

                    </div>
                      <div className="w-full min-w-0 flex-1 md:max-w-md text-center">
                        <p className="text-lg font-medium text-gray-900 hover:underline dark:text-white">
                        {prod.product.title}
                        </p>
                      </div>
                  </div>
                </div>
              </div>
              ))}
              </div>
              <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
                <div className="flow-root">
                  <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Order Price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${order.totalOrderPrice}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Shipping Price
                      </dt>
                      <dd className="text-base font-medium text-green-500">
                        ${order.shippingPrice}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Tax Price
                      </dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">
                        ${order.taxPrice}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-bold text-gray-900 dark:text-white">
                        Total
                      </dt>
                      <dd className="text-base font-bold text-gray-900 dark:text-white">
                        $
                        {order.totalOrderPrice +
                          order.shippingPrice +
                          order.taxPrice}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Payment Method Type
                      </dt>
                      <dd className="text-base font-medium text-green-500 dark:text-white ">
                        {order.paymentMethodType.toUpperCase()}
                      </dd>
                    </dl>
                    <dl className="flex items-center justify-between gap-4 py-3">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                      Delivered
                      </dt>
                      <dd className="text-base font-medium text-green-500 dark:text-white ">
                        {order.isDelivered?<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Delivered</span>:<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-900 dark:text-blue-300">Shipped</span>}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </form>
        ))}
      </section>
    </div>
  );
}
