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
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
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

      // Send the Google user data to MongoDB
      const res = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: "google-auth",  // Placeholder, since password isn't needed for Google signup
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 bg-gray-50">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">Welcome to EcoBin!</h2>
          <p className="text-gray-600 text-center mb-6">Join us in making the world a greener place.</p>

          <form onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div className="mb-4 flex items-center">
              <FaUser className="text-gray-600 mr-3 text-lg" />
              <input type="email" id="email" className="w-full p-3 border rounded text-sm md:text-base"
                placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="mb-4 flex items-center">
              <FaLock className="text-gray-600 mr-3 text-lg" />
              <input type="password" id="password" className="w-full p-3 border rounded text-sm md:text-base"
                placeholder="Password" onChange={handleChange} required />
            </div>
            <div className="mb-4 flex items-center">
              <FaPhoneAlt className="text-gray-600 mr-3 text-lg" />
              <input type="tel" id="phone" className="w-full p-3 border rounded text-sm md:text-base"
                placeholder="Phone" onChange={handleChange} required />
            </div>
            <div className="mb-4 flex items-center">
              <FaMapMarkedAlt className="text-gray-600 mr-3 text-lg" />
              <input type="text" id="address" className="w-full p-3 border rounded text-sm md:text-base"
                placeholder="Address" onChange={handleChange} required />
            </div>
            <button type="submit"
              className={`w-full p-3 text-white bg-green-600 rounded hover:bg-green-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}>
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          {/* Google Sign Up Button */}
          <button onClick={handleGoogleSignup}
            className="w-full p-3 mt-4 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600">
            <FaGoogle className="mr-2" /> Sign Up with Google
          </button>
        </div>

        {/* Right Section */}
        <div className="flex lg:flex-col w-full lg:w-1/2 bg-green-200 items-center justify-center p-6">
          <div className="text-center">
            <div className="mb-4">
              <div className="bg-green-500 p-6 rounded-full text-white text-3xl">
                <FaRecycle /> {/* Recycling Icon */}
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">EcoBin</h2>
            <p className="text-gray-600 text-sm md:text-base">Already have an account?</p>
            <Link to="/signin" className="text-green-600 mt-2 inline-block hover:underline text-sm md:text-base">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
