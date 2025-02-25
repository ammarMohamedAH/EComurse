import React, { useState, useEffect } from "react";
import useApidata from "./../../Hooks/useApidata";
import Loading from "../Loading/Loading";
import Modal from "react-modal";
import { Helmet } from "react-helmet";
Modal.setAppElement("#root");

export default function Brands() {
  let { data, isError, error, isLoading } = useApidata(
    "https://ecommerce.routemisr.com/api/v1/brands",
    "brands"
  );

  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  function openModal(id) {
    setSelectedId(id);
    setIsOpen(true);
  }

  useEffect(() => {
    if (selectedId) {
      fetch(`https://ecommerce.routemisr.com/api/v1/brands/${selectedId}`)
        .then((res) => res.json())
        .then((brandData) => setSelectedBrand(brandData.data))
        .catch((error) => console.error(error));
    }
  }, [selectedId]);

  if (isLoading) return <Loading />;

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
    <div className="container px-28 text-center py-10">
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h2 className="text-green-600 text-[40px] font-semibold pb-10">
        All Brands
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.data?.data?.map((prod) => (
          <button
            key={prod._id}
            className="text-center product rounded-lg p-4 border overflow-hidden transition duration-200 group"
            onClick={() => openModal(prod._id)}
            type="button"
          >
            <img src={prod.image} alt={prod.name} />
            <p className="text-lg">{prod.name}</p>
          </button>
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto flex justify-center items-center flex-col"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
      >
        {selectedBrand ? (
          <>
            <h2 className="text-7xl font-bold text-green-500">
              {selectedBrand.name}
            </h2>
            <h2 className="text-xl">{selectedBrand.slug}</h2>
            <img src={selectedBrand.image} alt={selectedBrand.name} />
          </>
        ) : (
          <Loading />
        )}
        <button
          onClick={() => setIsOpen(false)}
          className="mt-4 self-end bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          close
        </button>
      </Modal>
    </div>
  );
}
