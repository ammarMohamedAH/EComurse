import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

function resetpass({ resetCode }) {
  return axios
    .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", { resetCode })
    .then((response) => response.data);
}

export default function VerifyCode() {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: resetpass,
    onSuccess: () => {
      toast.success("resetCode sent successfully!");
      navigate("/changePassword");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });

  const formik = useFormik({
    initialValues: { resetCode: "" },
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="container">
      <Helmet>
                          <title>VerifyCode</title>
                        </Helmet>
      {isLoading ? (
        <Loading /> 
      ) : (
        <form className="max-w-6xl mx-auto" onSubmit={formik.handleSubmit}>
          <div className="my-5">
            <label
              htmlFor="resetCode"
              className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white"
            >
              Reset your account password
            </label>
            <input
              type="text"
              id="resetCode"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onBlur={formik.handleBlur}
              value={formik.values.resetCode}
              onChange={formik.handleChange}
              placeholder="Code"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Verify
          </button>
        </form>
      )}
    </div>
  );
}
