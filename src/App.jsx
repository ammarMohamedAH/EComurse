
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Login from './Components/Login/Login'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductDetails from './Components/Productdetails/Productdetails'
import Catrgories from './Components/Catrgories/Catrgories'
import ProductItem from './Components/ProductItem/ProductItem'
import Register from './Components/Register/Register'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart';
import Wishlist from './Components/Wishlist/Wishlist'
import ProtuctedRoute from './Components/ProtuctedRoute.jsx/ProtuctedRoute'
import ProtuctedRoute2 from './Components/ProtectedRoute2/ProtectedRoute2'
import Notfound from './Components/NotFound/Notfound'
import ResetPassword from './Components/Reset-password.jsx/ResetPassword'
import VerifyCode from './Components/Verify-code/VerifyCode'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import Allorders from './Components/Allorders/Allorders'

function App() {
  
  
  let routs = createBrowserRouter([{path:'/',element:<Layout></Layout>,children:[
    {index:true,element:<ProtuctedRoute2><Login></Login></ProtuctedRoute2>},
    {path:'/login',element:<ProtuctedRoute2><Login></Login></ProtuctedRoute2>},
    {path:'/regester',element:<ProtuctedRoute2><Register></Register></ProtuctedRoute2>},
    {path:'/home',element:<ProtuctedRoute><Home></Home></ProtuctedRoute>},
    {path:'/product',element:<ProtuctedRoute><ProductItem></ProductItem></ProtuctedRoute>},
    {path:'/wish',element:<ProtuctedRoute><Wishlist></Wishlist></ProtuctedRoute>},
    {path:'/productdetails/:id',element:<ProtuctedRoute><ProductDetails></ProductDetails></ProtuctedRoute>},
    {path:'/catrgories',element:<ProtuctedRoute><Catrgories></Catrgories></ProtuctedRoute>},
    {path:'/allorders',element:<ProtuctedRoute><Allorders></Allorders></ProtuctedRoute>},
    {path:'/brands',element:<ProtuctedRoute><Brands></Brands></ProtuctedRoute>},
    {path:'/cart',element:<ProtuctedRoute><Cart></Cart></ProtuctedRoute>},
    {path:'/reset-password',element:<ResetPassword></ResetPassword>},
    {path:'/verify-code',element:<VerifyCode></VerifyCode>},
    {path:'/changePassword',element:<ChangePassword></ChangePassword>},
    {path:'*',element:<Notfound></Notfound>},
  ]}])

  return (
    <>
      <RouterProvider router={routs}></RouterProvider>
    </>
  )
}

export default App
