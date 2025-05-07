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
          ? "bg-gradient-to-r from-green-900/95 to-emerald-800/95 backdrop-blur-md shadow-xl py-2" 
          : "bg-gradient-to-r from-green-900/75 to-emerald-800/75 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex items-center group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm shadow-inner group-hover:bg-white/40 transition-all duration-300">
              <Recycle className="text-white h-6 w-6 group-hover:scale-110 transition-all duration-300" />
            </div>
            <div className="ml-3 flex flex-col">
              <span className="text-2xl font-bold tracking-tight text-white group-hover:text-green-100 transition-colors duration-300">
                EcoBin
              </span>
              <span className="hidden sm:block text-sm text-emerald-100 font-medium">Navigate Sustainability</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            <Link
              to="/"
              className="px-4 py-2.5 mx-1 rounded-full text-base font-medium text-white hover:text-green-100 hover:bg-white/15 flex items-center transition-all duration-300"
            >
              <Home className="mr-2 h-5 w-5" />
              Home
            </Link>
            {email && (
              <Link
                to="/Books"
                className="px-4 py-2.5 mx-1 rounded-full text-base font-medium text-white hover:text-green-100 hover:bg-white/15 flex items-center transition-all duration-300"
              >
                <Recycle className="mr-2 h-5 w-5" />
                Recycling Order
              </Link>
            )}
            <Link
              to="/about_us"
              className="px-4 py-2.5 mx-1 rounded-full text-base font-medium text-white hover:text-green-100 hover:bg-white/15 flex items-center transition-all duration-300"
            >
              <Info className="mr-2 h-5 w-5" />
              About Us
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2.5 mx-1 rounded-full text-base font-medium text-white hover:text-green-100 hover:bg-white/15 flex items-center transition-all duration-300"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact
            </Link>
          </div>

          {/* User/Auth Section */}
          <div className="hidden lg:flex lg:items-center lg:space-x-3">
            {email ? (
              <div className="flex items-center space-x-3">
                {email && (
                  <Link
                    to="/scanner"
                    className="px-4 py-2.5 mx-1 rounded-full text-base font-medium text-white hover:text-green-100 hover:bg-white/15 flex items-center transition-all duration-300"
                  >
                    <Recycle className="mr-2 h-5 w-5" />
                    Image Scan
                  </Link>
                )}
                <button
                  onClick={() => navigate(`/employee_profile/${email}`)}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white hover:text-green-100 transition-all duration-300 backdrop-blur-sm"
                >
                  <User className="h-5 w-5" />
                  <span className="text-base font-medium truncate max-w-[150px]">{email}</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-3 rounded-full bg-white/15 hover:bg-red-500/30 text-white hover:text-red-100 transition-all duration-300 backdrop-blur-sm"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/shop_workers_login"
                  className="px-5 py-2.5 rounded-full text-base font-medium text-white hover:text-green-100 hover:bg-white/15 flex items-center transition-all duration-300 backdrop-blur-sm"
                  title="Worker Login"
                >
                  <User className="mr-2 h-5 w-5" />
                  Workers Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white text-base font-bold flex items-center transition-all duration-300 shadow-xl shadow-emerald-500/20"
                >
                  <User className="mr-2 h-5 w-5" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-full text-white hover:text-green-100 hover:bg-white/15 focus:outline-none transition-all duration-300 backdrop-blur-sm"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {menuOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 bg-gradient-to-b from-green-900/98 to-emerald-800/98 backdrop-blur-md transition-all duration-300 transform ${
          menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setMenuOpen(false)}
            className="p-2.5 rounded-full text-white hover:text-green-100 hover:bg-white/15"
          >
            <X className="h-7 w-7" />
          </button>
        </div>
        <div className="px-6 py-8 space-y-6 flex flex-col items-center">
          <Link
            to="/"
            className="w-full px-5 py-4 rounded-xl text-center text-xl font-medium text-white hover:text-green-100 hover:bg-white/15 flex items-center justify-center transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <Home className="mr-3 h-6 w-6" />
            Home
          </Link>
          {email && (
            <Link
              to="/Books"
              className="w-full px-5 py-4 rounded-xl text-center text-xl font-medium text-white hover:text-green-100 hover:bg-white/15 flex items-center justify-center transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <Recycle className="mr-3 h-6 w-6" />
              Recycling Order
            </Link>
          )}
          {email && (
            <Link
              to="/scanner"
              className="w-full px-5 py-4 rounded-xl text-center text-xl font-medium text-white hover:text-green-100 hover:bg-white/15 flex items-center justify-center transition-all duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <Recycle className="mr-3 h-6 w-6" />
              Image Scan
            </Link>
          )}
          <Link
            to="/about_us"
            className="w-full px-5 py-4 rounded-xl text-center text-xl font-medium text-white hover:text-green-100 hover:bg-white/15 flex items-center justify-center transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <Info className="mr-3 h-6 w-6" />
            About Us
          </Link>
          <Link
            to="/contact"
            className="w-full px-5 py-4 rounded-xl text-center text-xl font-medium text-white hover:text-green-100 hover:bg-white/15 flex items-center justify-center transition-all duration-300"
            onClick={() => setMenuOpen(false)}
          >
            <Mail className="mr-3 h-6 w-6" />
            Contact
          </Link>
          
          <div className="w-full h-px bg-white/20 my-6"></div>
          
          {email ? (
            <div className="w-full space-y-5">
              <div className="flex flex-col items-center">
                <div className="h-24 w-24 rounded-full bg-white/15 flex items-center justify-center shadow-lg">
                  <User className="h-12 w-12 text-white" />
                </div>
                <div className="mt-4 text-center">
                  <div className="text-2xl font-medium text-white break-all">{email}</div>
                </div>
              </div>
              <div className="flex justify-center mt-5 gap-5">
                <button
                  onClick={() => {
                    navigate(`/employee_profile/${email}`);
                    setMenuOpen(false);
                  }}
                  className="px-5 py-4 rounded-xl bg-white/15 text-white hover:bg-white/25 transition-all duration-300 flex-1 flex items-center justify-center"
                >
                  <User className="mr-2 h-6 w-6" />
                  <span className="text-xl">Profile</span>
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="px-5 py-4 rounded-xl bg-white/15 text-white hover:bg-red-500/30 transition-all duration-300 flex-1 flex items-center justify-center"
                >
                  <LogOut className="mr-2 h-6 w-6" />
                  <span className="text-xl">Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <Link
                to="/shop_workers_login"
                className="block w-full px-5 py-4 rounded-xl text-center text-xl font-medium bg-white/15 text-white hover:bg-white/25 transition-all duration-300"
                onClick={() => setMenuOpen(false)}
              >
                <span className="flex items-center justify-center">
                  <User className="mr-3 h-6 w-6" />
                  Worker Login
                </span>
              </Link>
              <Link
                to="/signup"
                className="block w-full px-5 py-4 rounded-xl text-center text-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-white transition-all duration-300 shadow-lg"
                onClick={() => setMenuOpen(false)}
              >
                <span className="flex items-center justify-center">
                  <User className="mr-3 h-6 w-6" />
                  Sign Up
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}