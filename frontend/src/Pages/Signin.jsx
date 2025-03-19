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
    <div className="flex flex-col min-h-screen bg-gradient-to-t from-[#E8F0F6] to-[#FFFFFF]">
      <div className="flex justify-center items-center flex-grow p-6 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}>
        <div className="relative z-10 flex w-full max-w-md bg-white rounded-xl shadow-lg p-8 backdrop-blur-sm">
          <div className="w-full p-4">
            <h2 className="text-[#3F4F69] text-3xl font-semibold text-center mb-6">Sign In</h2>

            {/* Normal Sign-in Form */}
            <form onSubmit={handleSubmit}>
              {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

              <div className="mb-5">
                <label className="block text-sm font-medium text-[#4F5B75]" htmlFor="email">Email:</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className="mt-1 block w-full px-8 py-3 border border-[#C6D1E1] rounded-md shadow-sm bg-[#F9FAFB] text-[#4A4A4A] placeholder-[#A6B2C1] focus:outline-none focus:ring-2 focus:ring-[#A6C7F0] focus:border-[#A6C7F0] sm:text-sm transition-all"
                    onChange={handleChange}
                    required
                  />
                  <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-3 text-[#A6B2C1]" />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-[#4F5B75]" htmlFor="password">Password:</label>
                <div className="relative">
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    className="mt-1 block w-full px-8 py-3 border border-[#C6D1E1] rounded-md shadow-sm bg-[#F9FAFB] text-[#4A4A4A] placeholder-[#A6B2C1] focus:outline-none focus:ring-2 focus:ring-[#A6C7F0] focus:border-[#A6C7F0] sm:text-sm transition-all"
                    onChange={handleChange}
                    required
                  />
                  <FontAwesomeIcon icon={faLock} className="absolute left-3 top-3 text-[#A6B2C1]" />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-gradient-to-r from-[#67B7F7] to-[#4B99FF] text-white py-3 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#A6C7F0] focus:ring-offset-2 shadow-md transition-all transform hover:scale-105 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
              className="w-full p-3 mt-6 flex items-center justify-center bg-[#4285F4] text-white rounded-lg hover:bg-[#3367D6] transition-all">
              <FaGoogle className="mr-2" /> Sign In with Google
            </button>

            {/* Footer Section */}
            <div className="mt-6 text-center text-sm text-[#A6B2C1]">
              <p>New to EcoBin? <a href="/signup" className="text-[#4B99FF] hover:underline">Create an Account</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
