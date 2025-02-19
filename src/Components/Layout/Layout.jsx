
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import img from '../../assets/light-patten.svg'

export default function Layout() {
  return (
    <div style={{backgroundImage:`url(${img})`}}>
    <Navbar></Navbar>
    <Outlet></Outlet>
    </div>
  )
}
