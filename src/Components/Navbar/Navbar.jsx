import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { userToken } from "../../context/UserContext";
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from "../../context/CarContext";

export default function Navbar() {
  let { isLogin, setLogin } = useContext(userToken);
  let { numOfItems } = useContext(CartContext);
  let navigate = useNavigate();
  
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
  
  function logOut() {
    localStorage.removeItem("token");
    setLogin(null);
    navigate("/login");
  }

  return (
    <nav className="fixed-top bg-[#f8f9fa] border-gray-200 dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Cart Logo" />
        </NavLink>

     
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        
        <div
          className={`w-full ${isMenuOpen ? "block" : "hidden"} lg:flex lg:justify-end flex-1`}
          id="navbar-default"
        >
          <ul className="flex flex-col p-4 lg:p-0 mt-4 border rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            {isLogin ? (
              <div className="flex lg:flex-row flex-col align-middle gap-6 justify-evenly w-full">
                <div className="lg:flex gap-6 ml-20">
                  <li><NavLink to="/home" className="block text-gray-600 py-2 px-3 hover:text-gray-800">Home</NavLink></li>
                  <li><NavLink to="/cart" className="block text-gray-600 py-2 px-3 hover:text-gray-800">Cart</NavLink></li>
                  <li><NavLink to="/wish" className="block text-gray-600 py-2 px-3 hover:text-gray-800">Wish List</NavLink></li>
                  <li><NavLink to="/product" className="block text-gray-600 py-2 px-3 hover:text-gray-800">Products</NavLink></li>
                  <li><NavLink to="/catrgories" className="block text-gray-600 py-2 px-3 hover:text-gray-800">Categories</NavLink></li>
                  <li><NavLink to="/brands" className="block text-gray-600 py-2 px-3 hover:text-gray-800">Brands</NavLink></li>
                  <li><NavLink to="/allorders" className="block text-gray-600 py-2 px-3 hover:text-gray-800">Allorders</NavLink></li>
                </div>
                <div className="lg:flex gap-6">
                  <li>
                    <NavLink to="/cart" className="relative inline-flex items-center p-3 text-gray-600 text-3xl">
                      <FaCartShopping />
                      <span className="sr-only">Notifications</span>
                      <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-green-500 rounded-md -top-2 -end-2">
                        {numOfItems}
                      </div>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/" className="block text-gray-600 py-2 px-3 hover:text-gray-800" onClick={logOut}>
                      Log out
                    </NavLink>
                  </li>
                </div>
              </div>
            ) : (
              <div className="lg:flex flex-row justify-between gap-6">
                <li><NavLink to="/login" className="block text-gray-600 py-2 px-3 hover:text-gray-800">Log in</NavLink></li>
                <li><NavLink to="/register" className="block text-gray-600 py-2 px-3 hover:text-gray-800">Register</NavLink></li>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}