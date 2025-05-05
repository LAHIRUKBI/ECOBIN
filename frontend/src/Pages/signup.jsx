import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRecycle, FaUser, FaPhoneAlt, FaMapMarkedAlt, FaLock, FaGoogle } from 'react-icons/fa';
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHbK9kxqjljXysL1KhDjJqXKcOhXi9jt4",
  authDomain: "ecobin-f9be5.firebaseapp.com",
  projectId: "ecobin-f9be5",
  storageBucket: "ecobin-f9be5.firebasestorage.app",
  messagingSenderId: "923510235468",
  appId: "1:923510235468:web:4740712b78f52c0a68afe9",
  measurementId: "G-F2YJ92Z9F3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Signup() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Component loaded");
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "phone") {
      if (!/^\d*$/.test(value) || value.length > 10) {
        return;
      }
    }

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'Signup failed. Please try again.');
        return;
      }

      setError(null);
      navigate("/signin");
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: "google-auth",
          phone: user.phoneNumber || "N/A",
          address: "N/A",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Google Signup failed. Please try again.');
        return;
      }

      setError(null);
      navigate("/signin");
    } catch (error) {
      console.error("Google Signup Error:", error.message);
      setError("Google Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 px-4 py-10">
      <div className="flex flex-col lg:flex-row shadow-xl bg-white rounded-2xl overflow-hidden w-full max-w-5xl">
        {/* Left Panel - Form Section */}
        <div className="w-full lg:w-1/2 px-10 py-12 space-y-6 bg-white">
          <div className="text-center">
            <div className="inline-flex items-center justify-center bg-green-100 p-4 rounded-full mb-4">
              <FaRecycle className="text-green-600 text-4xl animate-spin-slow" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Join EcoBin</h1>
            <p className="text-gray-500 mt-2">Create your account to start your sustainable journey</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-green-500" />
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-green-500" />
                </div>
                <input
                  type="password"
                  id="password"
                  placeholder="Password (6+ characters)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhoneAlt className="text-green-500" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Phone number"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {formData.phone.length > 0 && formData.phone.length < 10 && (
                  <p className="text-xs text-red-500 mt-1">Phone number must be 10 digits</p>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkedAlt className="text-green-500" />
                </div>
                <input
                  type="text"
                  id="address"
                  placeholder="Your address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-300 ${
                loading ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Sign Up'
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-white text-sm text-gray-500">Or sign up with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-all duration-300 hover:shadow-sm"
          >
            <FaGoogle className="text-red-500" />
            Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/signin" className="text-green-600 font-medium hover:text-green-700 hover:underline">
              Sign in
            </Link>
          </p>
        </div>

        {/* Right Panel - Visual Section */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-green-600 to-green-800 text-white flex-col justify-center items-center p-12 relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/asfalt-light.png")' }}></div>
          <div className="z-10 flex flex-col items-center space-y-6 text-center max-w-sm">
            <div className="bg-white bg-opacity-20 p-5 rounded-full backdrop-blur-sm">
              <FaRecycle className="text-white text-5xl" />
            </div>
            <h2 className="text-3xl font-bold">EcoBin Vision</h2>
            <p className="text-sm leading-relaxed text-green-100">
              We believe in a cleaner, greener world where waste becomes worth.
              Sign up today and be part of the sustainability movement.
            </p>
            <div className="w-full mt-4 space-y-3">
              <div className="flex items-start">
                <div className="bg-green-500 rounded-full p-1.5 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-green-100 text-left">Track your recycling impact with real-time analytics</span>
              </div>
              <div className="flex items-start">
                <div className="bg-green-500 rounded-full p-1.5 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-green-100 text-left">Earn rewards for your sustainable actions</span>
              </div>
              <div className="flex items-start">
                <div className="bg-green-500 rounded-full p-1.5 mr-3 mt-0.5 flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm text-green-100 text-left">Connect with a community of eco-conscious individuals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}