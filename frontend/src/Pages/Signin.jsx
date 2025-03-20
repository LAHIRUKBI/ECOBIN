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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-gray-700 text-center mb-6">Welcome Back!</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1" htmlFor="email">Email</label>
            <div className="relative">
              <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                id="email"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1" htmlFor="password">Password</label>
            <div className="relative">
              <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                id="password"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-400 focus:border-blue-400"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          onClick={handleGoogleSignin}
          className="w-full flex items-center justify-center gap-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
        >
          <FaGoogle /> Sign In with Google
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          New to EcoBin? <a href="/signup" className="text-blue-500 hover:underline">Create an Account</a>
        </p>
      </div>
    </div>
  );
}
