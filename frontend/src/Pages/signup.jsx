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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-green-200 to-green-300 px-4 py-10">
      <div className="flex flex-col lg:flex-row shadow-2xl bg-white rounded-3xl overflow-hidden w-full max-w-6xl">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 px-8 py-12 space-y-6 bg-white">
          <div className="text-center">
            <FaRecycle className="text-green-600 text-5xl mx-auto mb-2 animate-spin-slow" />
            <h1 className="text-3xl font-extrabold text-green-700">Join EcoBin</h1>
            <p className="text-gray-500 text-sm mt-1">Recycle, Reuse, Reinvent.</p>
          </div>

          {error && <div className="text-red-600 text-sm text-center">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <FaUser className="absolute left-4 top-3.5 text-green-600" />
              <input type="email" id="email" placeholder="Email"
                className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                onChange={handleChange} required />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-3.5 text-green-600" />
              <input type="password" id="password" placeholder="Password"
                className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                onChange={handleChange} required />
              <p className="text-xs text-gray-400 mt-1 ml-1">Use 6+ characters for a stronger password.</p>
            </div>

            <div className="relative">
              <FaPhoneAlt className="absolute left-4 top-3.5 text-green-600" />
              <input type="tel" id="phone" placeholder="Phone Number"
                className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                value={formData.phone} onChange={handleChange} required />
              {formData.phone.length > 0 && formData.phone.length < 10 && (
                <p className="text-xs text-red-500 ml-1">Must be 10 digits</p>
              )}
            </div>

            <div className="relative">
              <FaMapMarkedAlt className="absolute left-4 top-3.5 text-green-600" />
              <input type="text" id="address" placeholder="Address"
                className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500"
                onChange={handleChange} required />
            </div>

            <button type="submit"
              className={`w-full p-3 text-white font-semibold bg-green-600 rounded-xl hover:bg-green-700 transition transform hover:scale-105 duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-3 p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition transform hover:scale-105 duration-300">
            <FaGoogle className="text-lg" /> Sign Up with Google
          </button>

          <p className="text-center text-sm mt-6 text-gray-500">
            Already have an account?{" "}
            <Link to="/signin" className="text-green-700 font-medium hover:underline">Sign In</Link>
          </p>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-gradient-to-br from-green-500 via-green-600 to-green-700 text-white flex-col justify-center items-center relative px-8 py-12">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="z-10 flex flex-col items-center space-y-6 text-center max-w-xs">
            <FaRecycle className="text-white text-6xl animate-pulse" />
            <h2 className="text-3xl font-bold">EcoBin Vision</h2>
            <p className="text-sm leading-relaxed">
              We believe in a cleaner, greener world where waste becomes worth.
              Sign up today and be a hero for the environment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
