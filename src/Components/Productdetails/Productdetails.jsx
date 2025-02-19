import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Slider from "react-slick";
import useCartMutation, { addToCart } from "../../Hooks/useCartMutation";
import toast from "react-hot-toast";
import useApidata from "../../Hooks/useApidata";
import useMutationWish, { addToWish } from "../../Hooks/useMutationWish";
import { useContext, useEffect } from "react";
import { CartContext } from "../../context/CarContext";

export default function ProductDetails() {
  let { id } = useParams();

  
  let { data, isLoading, error: apiError } = useApidata(
    `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    "prodDet"
  );

  let {
    data: dataMut,
    isError: isErrorMuta,
    isSuccess: isSuccessMutat,
    mutate,
    error: errorMutat,
    isPending: isPendingMut,
  } = useCartMutation(addToCart);


  let {
    data: dataWish,
    mutate: mutateWish,
    isSuccess: isSuccessWish,
    isPending: isPendingWish,
    isError: isErrorWish,
    error: errorWish,
  } = useMutationWish(addToWish);

  let { setNumOfItems } = useContext(CartContext);

  useEffect(() => {
    if (dataMut?.data?.numOfCartItems !== undefined) {
      setNumOfItems(dataMut?.data?.numOfCartItems);
    }
  }, [dataMut, setNumOfItems]);

  useEffect(() => {
    if (isSuccessMutat) toast.success(dataMut?.data?.message);
    if (isSuccessWish) toast.success(dataWish?.data?.message);
    if (isErrorMuta) toast.error(errorMutat?.response?.data?.message);
    if (isErrorWish) toast.error(errorWish?.response?.data?.message);
    if (apiError) toast.error("Error");
  }, [
    isSuccessMutat,
    isSuccessWish,
    isErrorMuta,
    isErrorWish,
    apiError,
    dataMut,
    dataWish,
    errorMutat,
    errorWish,
  ]);

  if (isLoading || isPendingMut || isPendingWish) return <Loading />;


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    customPaging: () => (
      <div className="w-3 h-3 bg-gray-400 rounded-full mx-1 transition-all duration-300 hover:bg-gray-600"></div>
    ),
    appendDots: () => (
      <div className="flex justify-center mt-4">
        <div className="flex justify-center gap-4 mt-7">
          <button
            className="w-4 h-2 bg-gray-300 rounded-full mx-1 transition-all duration-300 hover:bg-gray-600"
            onClick={() =>
              document.querySelector(".pDetails .slick-prev")?.click()
            }
          ></button>
          <button
            className="w-4 h-2 bg-gray-300 rounded-full mx-1 transition-all duration-300 hover:bg-gray-600"
            onClick={() =>
              document.querySelector(".pDetails .slick-next")?.click()
            }
          ></button>
        </div>
      </div>
    ),
  };

  return (
    <div className="container pDetails px-24">
      <div className="flex items-center gap-6">
        <div className="w-1/4">
          <Slider {...settings}>
            {data?.data?.data.images?.map((img, index) => (
              <img
                src={img}
                key={img}
                className="w-full my-6"
                alt={`slider image ${index + 1}`}
              />
            ))}
          </Slider>
        </div>
        <div className="w-3/4">
          <h2 className="text-[2rem] font-bold my-4">
            {data?.data?.data.title}
          </h2>
          <p className="text-gray-700 py-3">{data?.data?.data.description}</p>
          <div className="flex justify-between items-end">
            <div>
              <p>{data?.data?.data.price} EGP</p>
            </div>
            <div>
              <span>
                {data?.data?.data.ratingsAverage}
                <i className="fa-solid fa-star text-[#ffc908]"></i>
              </span>
            </div>
          </div>
          <div className="w-full flex items-center">
            <button
              onClick={() => {
                mutate(id);
              }}
              className="w-3/4 mx-auto block bg-green-500 transition duration-200 hover:bg-green-600 py-2 rounded-md text-white my-3"
            >
              + Add
            </button>
            <button onClick={() => mutateWish(id)}>
              <i className="fa-solid fa-heart fa-2xl"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
