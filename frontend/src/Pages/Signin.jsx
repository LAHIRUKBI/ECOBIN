import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { motion } from "framer-motion";

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6')] bg-cover bg-center opacity-10"></div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Welcome Back to EcoBin</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 text-sm px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">Email</label>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="you@example.com"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="********"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 font-semibold rounded-lg text-white bg-green-500 hover:bg-green-600 transition-all duration-200 shadow-md ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignin}
          className="w-full flex items-center justify-center gap-2 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all duration-200 shadow-md"
        >
          <FaGoogle /> Sign in with Google
        </button>

        <p className="mt-6 text-sm text-center text-gray-500">
          Don’t have an account?{' '}
          <a href="/signup" className="text-green-600 font-medium hover:underline">
            Create one
          </a>
        </p>
      </motion.div>
    </div>
  );
}
