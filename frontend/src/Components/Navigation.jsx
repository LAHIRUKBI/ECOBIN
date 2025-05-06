import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Recycle, Info, Mail, User, LogOut, Menu, X } from "lucide-react";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const email = localStorage.getItem("email");
  const navigate = useNavigate();

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-gradient-to-r from-green-800/95 to-emerald-700/95 backdrop-blur-md shadow-lg py-2" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center group"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm shadow-inner group-hover:bg-white/30 transition-all duration-300">
              <Recycle className="text-white h-5 w-5 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="ml-3 flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-green-100 transition-colors duration-300">
                EcoBin
              </span>
              <span className="hidden sm:block text-xs text-emerald-100/80">Navigate Sustainability</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <Link
              to="/"
              className="px-3 py-2 mx-1 rounded-full text-sm font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-all duration-300"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
            {email && (
              <Link
                to="/Books"
                className="px-3 py-2 mx-1 rounded-full text-sm font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-all duration-300"
              >
                <Recycle className="mr-2 h-4 w-4" />
                Recycling Order
              </Link>
            )}
            <Link
              to="/about_us"
              className="px-3 py-2 mx-1 rounded-full text-sm font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-all duration-300"
            >
              <Info className="mr-2 h-4 w-4" />
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-3 py-2 mx-1 rounded-full text-sm font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-all duration-300"
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact
            </Link>
          </div>

          {/* User/Auth Section */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            {email ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigate(`/employee_profile/${email}`)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-green-100 transition-all duration-300 backdrop-blur-sm"
                >
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium truncate max-w-[150px]">{email}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-2 rounded-full bg-white/10 hover:bg-red-500/20 text-white hover:text-red-100 transition-all duration-300 backdrop-blur-sm"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/shop_workers_login"
                  className="px-4 py-2 rounded-full text-sm font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center transition-all duration-300 backdrop-blur-sm"
                  title="Worker Login"
                >
                  <User className="mr-2 h-4 w-4" />
                  Worker Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-medium flex items-center transition-all duration-300 shadow-lg shadow-emerald-500/20"
                >
                  <User className="mr-2 h-4 w-4" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-full text-white hover:text-green-100 hover:bg-white/10 focus:outline-none transition-all duration-300 backdrop-blur-sm"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 bg-gradient-to-b from-green-800/95 to-emerald-700/95 backdrop-blur-md transition-all duration-300 transform ${
          menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-full text-white hover:text-green-100 hover:bg-white/10"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="px-6 py-8 space-y-6 flex flex-col items-center">
          <Link
            to="/"
            className="w-full px-5 py-4 rounded-xl text-center text-lg font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center justify-center transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <Home className="mr-3 h-5 w-5" />
            Home
          </Link>
          {email && (
            <Link
              to="/Books"
              className="w-full px-5 py-4 rounded-xl text-center text-lg font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center justify-center transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <Recycle className="mr-3 h-5 w-5" />
              Recycling Order
            </Link>
          )}
          <Link
            to="/about_us"
            className="w-full px-5 py-4 rounded-xl text-center text-lg font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center justify-center transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <Info className="mr-3 h-5 w-5" />
            About Us
          </Link>
          <Link
            to="/contact"
            className="w-full px-5 py-4 rounded-xl text-center text-lg font-medium text-white hover:text-green-100 hover:bg-white/10 flex items-center justify-center transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <Mail className="mr-3 h-5 w-5" />
            Contact
          </Link>
          
          <div className="w-full h-px bg-white/10 my-4"></div>
          
          {email ? (
            <div className="w-full space-y-4">
              <div className="flex flex-col items-center">
                <div className="h-20 w-20 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div className="mt-3 text-center">
                  <div className="text-xl font-medium text-white break-all">{email}</div>
                </div>
              </div>
              <div className="flex justify-center mt-4 gap-4">
                <button
                  onClick={() => {
                    navigate(`/employee_profile/${email}`);
                    setMenuOpen(false);
                  }}
                  className="px-5 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all duration-300 flex-1 flex items-center justify-center"
                >
                  <User className="mr-2 h-5 w-5" />
                  Profile
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="px-5 py-3 rounded-xl bg-white/10 text-white hover:bg-red-500/20 transition-all duration-300 flex-1 flex items-center justify-center"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-3">
              <Link
                to="/shop_workers_login"
                className="block w-full px-5 py-4 rounded-xl text-center text-lg font-medium bg-white/10 text-white hover:bg-white/20 transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Worker Login
              </Link>
              <Link
                to="/signup"
                className="block w-full px-5 py-4 rounded-xl text-center text-lg font-medium bg-emerald-500 hover:bg-emerald-400 text-white transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}