import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

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

export default function Signin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
      const res = await fetch("http://localhost:3000/api/signup/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setError(data.message || 'Signin failed. Please try again.');
        return;
      }

      setError(null);
      localStorage.setItem('email', formData.email);
      localStorage.setItem('userData', JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
      setLoading(false);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const res = await fetch("http://localhost:3000/api/signup/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: "google-auth",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || 'Google Sign-in failed. Please try again.');
        return;
      }

      setError(null);
      localStorage.setItem('email', user.email);
      localStorage.setItem('userData', JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      console.error("Google Signin Error:", error.message);
      setError("Google Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-300 relative">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')] bg-cover bg-center opacity-20"></div>

      {/* Content Container - Removed motion.div and replaced with regular div */}
      <div className="relative z-10 w-full max-w-lg bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-green-700">EcoBin Login</h1>
          <p className="mt-2 text-sm text-gray-600">Log in to access your dashboard and manage your waste smartly</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 text-sm px-4 py-3 rounded-md mb-6 shadow">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-sm shadow-sm"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                id="password"
                placeholder="********"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white text-sm shadow-sm"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-200 ${
              loading ? 'bg-green-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                Signing In...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500 text-sm font-medium">or sign in with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Sign-in */}
        <button
          onClick={handleGoogleSignin}
          className="w-full flex items-center justify-center gap-3 py-2.5 bg-red-500 text-white font-semibold text-sm rounded-xl hover:bg-red-600 transition duration-200 shadow-md"
        >
          <FaGoogle className="text-lg" /> Sign in with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-green-600 font-medium hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}