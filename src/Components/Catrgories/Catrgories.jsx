import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import useApidata from "./../../Hooks/useApidata";
import { Helmet } from "react-helmet";

export default function Catrgories() {
  const { data, isError, isLoading, error } = useApidata(
    "https://ecommerce.routemisr.com/api/v1/categories",
    "categories"
  );

  const [selectId, setSelectedId] = useState(null);
  const [selectCatName, setSelectedCatName] = useState(null);
  const [subCategories, setSubCategories] = useState([]); 
  function getSubCat(cat) {
    setSelectedCatName(cat.name);
    setSelectedId(cat._id);
  }

  useEffect(() => {
    if (selectId) {
      fetch(
        `https://ecommerce.routemisr.com/api/v1/categories/${selectId}/subcategories`
      )
        .then((res) => res.json())
        .then((catData) => setSubCategories(catData.data)) 
        .catch((error) => console.error(error));
    }
  }, [selectId]);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center font-bold text-3xl text-red-500">
        {error.message}
      </div>
    );

  return (
    <div className="grid md:grid-cols-3 gap-6 sm:p-24 px-5">
      {data?.data?.data.map((cat, index) => (
        <Cat key={index} getSubCat={getSubCat} cat={cat} />
      ))}

   
      {selectCatName && (
        <div className="col-span-full mt-10">
          <h2 className="text-[32px] text-center font-semibold mb-6 text-green-600">
            {selectCatName} Subcategories
          </h2>
          
          <ul className="grid grid-cols-3 gap-4">
            {subCategories.length > 0 ? (
              subCategories.map((sub, idx) => (
                <li key={idx} className="text-[28px] text-black list-none border p-2 font-semibold rounded-lg card text-center duration-300 cursor-pointer">
                  {sub.name}
                </li>
              ))
            ) : (
              <p className="text-red-500">There is no available Subcategories</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

function Cat({ cat, getSubCat }) {
  return (
    <div
      className="card border rounded-md cursor-pointer"
      onClick={() => getSubCat(cat)}
    >
      <Helmet>
                          <title>Categories</title>
                        </Helmet>
      <div className="card-img">
        <img
          className="aspect-4/3 object-cover w-full h-[300px]"
          src={cat.image}
          alt={cat.name}
        />
      </div>
      <div className="card-body py-5">
        <p className="text-green-700 text-3xl font-medium my-auto text-center">
          {cat.name}
        </p>
      </div>
    </div>
  );
}
