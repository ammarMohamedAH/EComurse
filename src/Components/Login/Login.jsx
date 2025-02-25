import axios from "axios";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { userToken } from './../../context/UserContext';
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Login() {

  let [errorMsg,setErrorMsg]=useState('');
  let [loading,setLoading]=useState(false);
  let {setLogin} = useContext(userToken);
  let navigate=useNavigate();
  async function handelLogin(values){
    setLoading(true)
  try {
    let {data}=await  axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",values)
   
    if(data.message==='success')
    {
      navigate("/home");
      setLogin(data.token);
      localStorage.setItem('token',data.token);
   
      
    }
    setLoading(false)
    setErrorMsg("")
  } catch (error)
  {
    setErrorMsg("Email or password is not correct");
    setLoading(false)

  }
    
  }

let validationSchema=Yup.object().shape({
 
  email:Yup.string().required().email(),
  password:Yup.string().required().min(8).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/,'Password is not valid'),
 
})
 let formik = useFormik({
initialValues:{

    email:'',
    password:'',
  
},
validationSchema,
onSubmit: handelLogin
 })
 useEffect(()=>{
  if(formik.errors.password  || formik.errors.email ||!formik.values.email ||!formik.values.password){
   document.getElementById('submit').setAttribute("disabled", false)
  }else{
    document.getElementById('submit').removeAttribute('disabled')
  }
 },[formik.values.email,formik.values.password,formik.errors.email,formik.errors.password])

  return (
    <div className="container py-20 md:px-20">
      <Helmet>
              <title>Login</title>
            </Helmet>
    <h2 className="text-[2rem] font-semibold text-gray-700 my-3">Login Now</h2>

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
      <div className="flex justify-between md:flex-row flex-col gap-4">
        <Link to="/reset-password">forget your password ?</Link>
        <button
        type="submit"
        id="submit"
        className={`font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${ formik.errors.password  || formik.errors.email ||!formik.values.email ||!formik.values.password ? "text-gray-500 border border-black ":'text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300   dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800'}`}
      >
        {loading ? 'loading....' : "Login Now"}
      </button>
      </div>
    </form>
  </div>


  )
}
