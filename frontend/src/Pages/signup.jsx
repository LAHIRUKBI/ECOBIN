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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 via-green-200 to-green-300 px-6 py-8">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-2xl rounded-3xl overflow-hidden animate-fade-in-up">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 bg-gray-50 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-4 text-center animate-bounce">Welcome to EcoBin!</h2>
          <p className="text-gray-600 text-center mb-8 text-sm md:text-base">Join us in making the world a greener place.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="text-red-500 text-center text-sm mb-4">{error}</div>}
            
            <div className="relative">
              <FaUser className="absolute top-3 left-4 text-green-600" />
              <input type="email" id="email" className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition" placeholder="Email" onChange={handleChange} required />
            </div>

            <div className="relative">
              <FaLock className="absolute top-3 left-4 text-green-600" />
              <input type="password" id="password" className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition" placeholder="Password" onChange={handleChange} required />
            </div>

            <div className="relative">
              <FaPhoneAlt className="absolute top-3 left-4 text-green-600" />
              <input type="tel" id="phone" className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
            </div>
            {formData.phone.length > 0 && formData.phone.length < 10 && (
              <span className="text-red-500 text-sm ml-1">Phone number must be exactly 10 digits.</span>
            )}

            <div className="relative">
              <FaMapMarkedAlt className="absolute top-3 left-4 text-green-600" />
              <input type="text" id="address" className="w-full pl-12 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 transition" placeholder="Address" onChange={handleChange} required />
            </div>

            <button type="submit"
              className={`w-full p-3 text-white bg-green-600 rounded-xl hover:bg-green-700 transition transform hover:scale-105 duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="mx-3 text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          {/* Google Sign Up Button */}
          <button onClick={handleGoogleSignup}
            className="w-full p-3 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-xl transition transform hover:scale-105 duration-300">
            <FaGoogle className="mr-2" /> Sign Up with Google
          </button>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex flex-col w-full lg:w-1/2 bg-gradient-to-br from-green-400 via-green-500 to-green-600 items-center justify-center p-10 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-green-700 opacity-20 mix-blend-overlay"></div>
          <div className="z-10 flex flex-col items-center space-y-4">
            <div className="bg-white p-6 rounded-full shadow-lg animate-pulse">
              <FaRecycle className="text-green-600 text-5xl" />
            </div>
            <h2 className="text-3xl font-bold">EcoBin</h2>
            <p className="text-white text-center text-sm md:text-base">Already have an account?</p>
            <Link to="/signin" className="underline hover:text-gray-200 transition">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
