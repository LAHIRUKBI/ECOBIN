import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaInfoCircle, FaEnvelope, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false); // Mobile menu toggle
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/"); 
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-5 shadow-lg relative">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="text-2xl font-serif font-bold text-white flex items-center space-x-2">
          <span>Book Haven</span>
        </a>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div
          className={`lg:flex flex-col lg:flex-row lg:items-center lg:space-x-8 lg:space-y-0 space-y-4 text-lg ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <Link to="/" className="flex items-center space-x-2 hover:text-teal-200">
            <FaHome />
            <span>Home</span>
          </Link>
          {email && (
            <Link to="/books" className="flex items-center space-x-2 hover:text-teal-200">
              <FaBook />
              <span>Books</span>
            </Link>
          )}
          <Link to="/about_Us" className="flex items-center space-x-2 hover:text-teal-200">
            <FaInfoCircle />
            <span>About Us</span>
          </Link>
          <Link to="/contact" className="flex items-center space-x-2 hover:text-teal-200">
            <FaEnvelope />
            <span>Contact</span>
          </Link>
        </div>

        {/* User Profile or Login/Signup Buttons */}
        <div className="relative">
          {email ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(`/employee_profile/${email}`)}
                className="flex items-center space-x-2 text-lg font-semibold px-4 py-2 rounded-md bg-teal-600 shadow-md hover:bg-teal-700 transition duration-300"
              >
                <FaUserCircle />
                <span>{email}</span>
              </button>
             
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link
                to="/signup"
                className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-700 transition duration-300"
              >
                <FaUserCircle />
                <span>Sign Up</span>
              </Link>
              <Link
                to="/Shop_workers_Login"
                className="flex items-center space-x-2 border border-teal-600 text-teal-100 px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition duration-300"
              >
                <FaUserCircle />
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
