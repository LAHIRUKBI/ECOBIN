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
        headers: {
          "Content-Type": "application/json",
        },
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

  // 🔹 Google Sign-In Logic
  const handleGoogleSignin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Send user details to MongoDB for verification/registration
      const res = await fetch("http://localhost:3000/api/signup/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: "google-auth", // Google users don't require passwords
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
    <div className="flex flex-col min-h-screen bg-lightgray">
      <div className="flex justify-center items-center flex-grow p-6">
        <div className="relative z-10 flex w-full max-w-4xl bg-white bg-opacity-90 shadow-lg rounded-lg p-6 md:p-9 backdrop-filter backdrop-blur-lg transition-all duration-800 hover:shadow-2xl hover:bg-white hover:bg-opacity-100">
          <div className="w-full sm:w-3/5 md:w-2/3 p-4">
            <h2 className="text-gray-800 text-3xl font-extrabold text-center mb-4">Sign In</h2>

            {/* Normal Sign-in Form */}
            <form onSubmit={handleSubmit}>
              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-800" htmlFor="email">Email:</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="mt-1 block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm transition-all"
                    onChange={handleChange}
                    required
                  />
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-gray-500" />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-800" htmlFor="password">Password:</label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="mt-1 block w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 sm:text-sm transition-all"
                    onChange={handleChange}
                    required
                  />
                  <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-gray-500" />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-md transition-all transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                    Signing In...
                  </>
                ) : 'Sign In'}
              </button>
            </form>

            {/* Google Sign-in Button */}
            <button onClick={handleGoogleSignin}
              className="w-full p-3 mt-4 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600">
              <FaGoogle className="mr-2" /> Sign In with Google
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
