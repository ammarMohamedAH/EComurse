import { Link } from "react-router-dom";
import useCartMutation, { addToCart } from "../../Hooks/useCartMutation";
import toast from "react-hot-toast";
import Loading from "./../Loading/Loading";
import useMutationWish, { addToWish } from "../../Hooks/useMutationWish";
import { useEffect } from "react";
import { useCart } from "../../context/CarContext";
import { useWish } from "../../context/WishContext";

export default function Product({ prod }) {
  let {
    imageCover,
    id,
    title,
    price,
    category,
    ratingsAverage,
    priceAfterDiscount,
  } = prod;

  let { data, isError, isSuccess, mutate, error, isPending } =
    useCartMutation(addToCart);

  let {
    data: dataWish,
    mutate: mutateWish,
    isSuccess: isSuccessWish,
    isPending: isPendingWish,
    isError: isErrorWish,
    error: errorWish,
  } = useMutationWish(addToWish);

  const { updateCart } = useCart();
  if (isSuccess) {
    updateCart();
  }
  const { updateWish, WishMatrix } = useWish();
  if (isSuccessWish) {
    updateWish();
  }


  useEffect(() => {
    if (isSuccess) toast.success(data?.data?.message);
    if (isSuccessWish) toast.success(dataWish?.data?.message);
    if (isError) toast.error(error?.response?.data?.message);
    if (isErrorWish) toast.error(errorWish?.response?.data?.message);
  }, [
    isSuccess,
    isSuccessWish,
    isError,
    isErrorWish,
    data,
    dataWish,
    error,
    errorWish,
  ]);

  return (
    <div className="product rounded-lg p-4 cursor-pointer overflow-hidden transition duration-200 group">
      {isPending || isPendingWish ? <Loading /> : ""}
      <Link to={`/productdetails/${id}`}>
        <img src={imageCover} className="w-full" alt={title} />
        <div className="mt-2">
          <p className="text-green-600 text-lg">{category.name}</p>

          <p className="text-md font-medium line-clamp-1">{title}</p>
          <div className="flex flex-wrap flex-row justify-between">
            <div className="flex justify-between">
              <p
                className={
                  priceAfterDiscount ? "line-through text-gray-500" : ""
                }
              >
                {price} EGP
              </p>
              <p>{priceAfterDiscount ? `${priceAfterDiscount} EGP` : ""}</p>
            </div>
            <div>
              <span>
                <i className="fa-solid fa-star text-[#ffc908] text-sm"></i>{" "}
                {ratingsAverage}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <div className="w-full">
        <button
          onClick={() => mutate(id)}
          className="text-white text-sm px-10 py-2 bg-[#4fa74f] rounded-md transition duration-300 translate-y-52 group-hover:translate-y-0"
        >
          <i className="fa-solid fa-plus"></i> Add
        </button>
        <button
          onClick={() => mutateWish(id)}
          className={` ${WishMatrix?.filter((WishMatrix) => WishMatrix._id === prod._id  
          ).length != 0 && "text-red-600"} text-[30px] px-2 py-2 float-end`}
        >
          <i className="fa-solid fa-heart"></i>
        </button>
        <div className="clear-both"></div>
      </div>
    </div>
  );
}
