import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

function resetPass({ email, newPassword }) {
  return axios
    .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", { email, newPassword })
    .then((response) => response.data);
}

export default function ChangePassword() {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: resetPass,
    onSuccess: () => {
      toast.success("Password updated successfully!");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });

  const formik = useFormik({
    initialValues: { email: "", newPassword: "" },
    onSubmit: (values) => mutate(values),
  });

  return (
    <div className="container pt-20 px-20">
      <h2 className="text-[2rem] font-semibold text-gray-700 my-3">Reset your Password</h2>

      {isLoading ? (
        <Loading /> 
      ) : (
        <form className="max-w-full mx-auto" onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="email"
              onBlur={formik.handleBlur}
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder=""
              required
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="newPassword"
              onBlur={formik.handleBlur}
              id="newPassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              placeholder=""
              required
            />
            <label
              htmlFor="newPassword"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              New Password
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              id="submit"
              className={`font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${
                formik.errors.newPassword || formik.errors.email || !formik.values.email || !formik.values.newPassword
                  ? "text-gray-500 border border-black"
                  : "text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              }`}
            >
              Reset Password
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
