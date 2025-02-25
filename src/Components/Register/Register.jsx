import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { userToken } from './../../context/UserContext';
import { Helmet } from "react-helmet";

export default function Register() {

  let navigate=useNavigate();
  let [errorMsg,setErrorMsg]=useState('');
  let [loading,setLoading]=useState(false);
  let {setLogin} = useContext(userToken);
  async function handelRegester(values){
    setLoading(true)
  try {
    let {data}=await  axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",values)
  
    if(data.message==='success')
    {
      navigate("/home")
      localStorage.setItem("token",data.token);
      setLogin(data.token)
    }
    setLoading(false)
    setErrorMsg("")
  } catch (error)
  {
    setErrorMsg("Email is already taken");
    setLoading(false)

  }
    
  }
let validationSchema=Yup.object().shape({
  name:Yup.string().min(3,'Name is too short').required('Name is required'),
  email:Yup.string().required().email(),
  password:Yup.string().required().min(8).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/,'Password is not valid'),
  rePassword:Yup.string().required().oneOf([Yup.ref('password')],'Password is not match'),
  phone:Yup.string().required().matches(/^(010|011|012|015)\d{8}$/,'Phone is not valid')
})
 let formik = useFormik({
initialValues:{
  name:'',
    email:'',
    password:'',
    rePassword:'',
    phone:'',
},
validationSchema,
onSubmit: handelRegester
 })

 
  return (
    <div className="container">
      <Helmet>
              <title>Regester</title>
            </Helmet>
      <h2 className="text-[1.5rem] font-bold my-3">Regester Now:</h2>

      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            value={formik.values.name}
            name="name"
            onBlur={formik.handleBlur}
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            onChange={formik.handleChange}
            placeholder=""
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
       {formik.errors.name && formik.touched.name ?  <div
          className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {formik.errors.name}
        </div>:""}

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
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>
        {formik.errors.email &&formik.touched.email?  <div
          className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {formik.errors.email}
        </div>:""}
        {errorMsg?  <div
          className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {errorMsg}
        </div>:""}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            onBlur={formik.handleBlur}
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder=""
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password &&formik.touched.password ?  <div
          className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {formik.errors.password}
        </div>:""}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="rePassword"
            onBlur={formik.handleBlur}
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            placeholder=""
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Confirm password
          </label>
        </div>
        {formik.errors.rePassword &&formik.touched.rePassword ?  <div
          className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {formik.errors.rePassword}
        </div>:""}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            onBlur={formik.handleBlur}
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder=""
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Phone number (123-456-7890)
          </label>
        </div>
        {formik.errors.phone &&formik.touched.phone ?  <div
          className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          {formik.errors.phone}
        </div>:""}
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          {loading ? 'loading....' : "Register"}
        </button>
      </form>
    </div>
  );
}
