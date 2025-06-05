import { NavLink } from 'react-router-dom';
import logo from '../assets/images/icon.png'

const Navbar = ({ onLogout }) => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
      : "text-indigo hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-golden border-b border-blue-600">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="React Expenses"
              />
              <span className="hidden md:block text-2xl font-bold ml-2">
                EXPENSE TRACKER
              </span>
            </NavLink>
            <div className="md:ml-auto">
              <div className="flex space-x-2">
                <NavLink
                  to="/"
                  className={linkClass}
                >Home</NavLink>
                <NavLink
                  to="/transactions"
                  className={linkClass}
                >List</NavLink>
                <NavLink
                  to="/add-transaction"
                  className={linkClass}
                >Add</NavLink>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to log out?")) {
                  onLogout();
                }
              }}
              className="ml-4 hover:text-red-500 hover:bg-red-200 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Log Out
            </button>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
