import React from "react";
import { Link } from "react-router-dom";
export default function Landing() {
  return (
    <div className="landing h-[85vh] p-10 flex justify-center flex-col items-center gap-8">
      <h1 className="text-5xl font-bold text-center">Welcome to our Store</h1>
      <p className="text-center text-xl">
        Discover the latest trends and products
      </p>
      <h2 className="text-xl">Discover Our Store</h2>
      <div className=" text-green-500 ">
        <i class="fa-solid fa-angles-down fa-bounce text-7xl"></i>
      </div>
      <div className="flex justify-center items-center">
      <Link to={"/login"}> <button className="bg-green-500 text-white px-4 py-2 rounded-xl mr-4 hover:bg-green-400">
          Login
        </button></Link>
        <span className="text-center  text-xl mr-4">Or</span>
        <Link to="/register"><button className="text-green-500 border border-green-500 px-4 py-2 rounded-xl mr-4 hover:bg-green-500 hover:text-white">
          Register Now
        </button></Link>
      </div>
    </div>
  );
}
