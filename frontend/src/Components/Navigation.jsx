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
    <nav className="bg-gradient-to-r from-green-700 to-green-500 text-white shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 hover:text-green-100 transition-all duration-300"
        >
          <div className="bg-white/20 backdrop-blur-md p-2 rounded-full animate-pulse">
            <FaRecycle className="text-white text-3xl" />
          </div>
          <span className="text-2xl font-bold font-display tracking-wide">
            EcoBin
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl lg:hidden focus:outline-none transition-transform duration-300"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Menu Items */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute lg:static top-full left-0 w-full lg:w-auto bg-green-600 lg:bg-transparent lg:flex flex-col lg:flex-row items-center lg:space-x-6 space-y-4 lg:space-y-0 py-4 px-6 lg:p-0 shadow-lg lg:shadow-none animate-fade-in-down`}
        >
          <Link
            to="/"
            className="flex items-center space-x-2 hover:text-green-100 transition-transform duration-300 hover:scale-105"
          >
            <FaHome />
            <span>Home</span>
          </Link>

          {email && (
            <Link
              to="/Books"
              className="flex items-center space-x-2 hover:text-green-100 transition-transform duration-300 hover:scale-105"
            >
              <FaRecycle />
              <span>Recycling</span>
            </Link>
          )}

          <Link
            to="/about_us"
            className="flex items-center space-x-2 hover:text-green-100 transition-transform duration-300 hover:scale-105"
          >
            <FaInfoCircle />
            <span>About Us</span>
          </Link>

          <Link
            to="/contact"
            className="flex items-center space-x-2 hover:text-green-100 transition-transform duration-300 hover:scale-105"
          >
            <FaEnvelope />
            <span>Contact</span>
          </Link>

          {/* Conditional: Profile or Auth Options */}
          {email ? (
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-3 lg:space-y-0 mt-4 lg:mt-0">
              <button
                onClick={() => navigate(`/employee_profile/${email}`)}
                className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-md hover:bg-white/30 font-semibold transition-all duration-300 shadow-md"
              >
                <FaUserCircle />
                <span>{email}</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-semibold transition-all duration-300"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 space-y-3 lg:space-y-0 mt-4 lg:mt-0">
              <Link
                to="/signup"
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition duration-300"
              >
                <FaUserCircle />
                <span>Sign Up</span>
              </Link>
              <Link
                to="/shop_workers_login"
                className="flex items-center space-x-2 border border-white px-4 py-2 rounded-lg hover:bg-white/10 transition duration-300"
              >
                <FaUserCircle />
                <span>Admin Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
