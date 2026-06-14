import { NavLink, useLocation } from 'react-router-dom';
import logo from '../assets/images/icon.png';

import { useDispatch } from 'react-redux';
import {logout} from '../features/auth/authSlice.js'

const Navbar = () => {
  // Updated Link styles for a glassy feel
  const dispatch = useDispatch();
  const isHistory = useLocation().pathname === '/transactions';
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-white bg-white/20 backdrop-blur-sm border border-white/20 rounded-md px-3 py-2 transition-all hidden sm:block"
      : "text-gray-300 hover:bg-white/10 hover:text-white rounded-md px-3 py-2 transition-all hidden sm:block";

  return (
    <nav className={`${isHistory ? 'relative': 'fixed'} z-50 w-[95%] top-4 left-1/2 -translate-x-1/2 rounded-lg
      bg-gradient-to-r from-black/65 via-black/40 to-black/65
      backdrop-blur-md 
      backdrop-saturate-150 
      border-b border-white/10 
      shadow-2xl`}>
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT — Logo */}
          <NavLink className="flex items-center gap-2" to="/">
            <img
              className="h-8 sm:h-10 w-auto brightness-110"
              src={logo}
              alt="Expense Tracker"
            />
            <span className="hidden md:block text-xl font-bold text-white tracking-tight">
              EXPENSE <span className="text-blue-400">TRACKER</span>
            </span>
          </NavLink>

          {/* RIGHT — Links + Logout */}
          <div className="flex items-center gap-4">
            <NavLink to="/transactions" className={linkClass}>
              List
            </NavLink>

            <NavLink to="/add-transaction" className={linkClass}>
              Add
            </NavLink>

            <button
              onClick={() => {
                if (window.confirm("Are you sure you want to log out?")) {
                  dispatch(logout());
                }
              }}
              className="px-2 py-1 rounded-md text-sm font-medium
              bg-red-500/20 text-red-400 border border-red-500/30
              hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              [➜
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;