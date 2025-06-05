import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const MainLayOut = ({ onLogout }) => {
  return (
    <>
        <Navbar onLogout={onLogout} />
        <Outlet />
        <ToastContainer />
    </>
  )
}

export default MainLayOut