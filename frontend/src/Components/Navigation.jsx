import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaRecycle,
  FaInfoCircle,
  FaEnvelope,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-green-700 to-green-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center group"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                <FaRecycle className="text-white text-xl group-hover:text-green-200 transition-colors duration-300" />
              </div>
              <span className="ml-3 text-2xl font-bold tracking-tight text-white group-hover:text-green-100 transition-colors duration-300">
                EcoBin
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-colors duration-300"
            >
              <FaHome className="mr-2" />
              Home
            </Link>
            {email && (
              <Link
                to="/Books"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-colors duration-300"
              >
                <FaRecycle className="mr-2" />
                Recycling Order
              </Link>
            )}
            <Link
              to="/about_us"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-colors duration-300"
            >
              <FaInfoCircle className="mr-2" />
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-colors duration-300"
            >
              <FaEnvelope className="mr-2" />
              Contact
            </Link>
          </div>

          {/* User/Auth Section */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4 ml-4">
            {email ? (
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(`/employee_profile/${email}`)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white hover:text-green-100 transition-colors duration-300"
                >
                  <FaUserCircle className="text-lg" />
                  <span className="text-sm font-medium">{email}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white hover:text-red-100 transition-colors duration-300"
                  title="Logout"
                >
                  <FaSignOutAlt className="text-lg" />
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/shop_workers_login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-colors duration-300"
                  title="Worker Login"
                >
                  <FaUserCircle className="mr-2" />
                  Worker Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-white text-green-700 hover:bg-green-50 text-sm font-medium flex items-center transition-colors duration-300"
                >
                  <FaUserCircle className="mr-2" />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-green-100 hover:bg-white/10 focus:outline-none transition-colors duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-green-700/95">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <FaHome className="mr-2" />
            Home
          </Link>
          {email && (
            <Link
              to="/Books"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-colors duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <FaRecycle className="mr-2" />
              Recycling Order
            </Link>
          )}
          <Link
            to="/about_us"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <FaInfoCircle className="mr-2" />
            About Us
          </Link>
          <Link
            to="/contact"
            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-colors duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <FaEnvelope className="mr-2" />
            Contact
          </Link>
          <div className="pt-4 pb-3 border-t border-white/10">
            {email ? (
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <FaUserCircle className="h-10 w-10 text-white" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-auto flex-shrink-0 p-1 rounded-full text-white hover:text-red-100 hover:bg-white/10 transition-colors duration-300"
                >
                  <FaSignOutAlt className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div className="mt-3 space-y-1">
                <Link
                  to="/shop_workers_login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-green-100 hover:bg-white/10 transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Worker Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-white text-green-700 hover:bg-green-50 transition-colors duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}