import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaUser, FaPhoneAlt, FaMapMarkedAlt, FaLock } from 'react-icons/fa';

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
        headers: {
          "Content-Type": "application/json",
        },
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 bg-gray-50">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center">Hello!</h2>
          <p className="text-gray-600 text-center mb-6">
            Please sign up to continue.
          </p>
          <form onSubmit={handleSubmit}>
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            <div className="mb-4 flex items-center">
              <FaUser className="text-gray-600 mr-3 text-lg" />
              <input
                type="email"
                id="email"
                className="w-full p-3 border rounded text-sm md:text-base"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <FaLock className="text-gray-600 mr-3 text-lg" />
              <input
                type="password"
                id="password"
                className="w-full p-3 border rounded text-sm md:text-base"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <FaPhoneAlt className="text-gray-600 mr-3 text-lg" />
              <input
                type="tel"
                id="phone"
                className="w-full p-3 border rounded text-sm md:text-base"
                placeholder="Phone"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4 flex items-center">
              <FaMapMarkedAlt className="text-gray-600 mr-3 text-lg" />
              <input
                type="text"
                id="address"
                className="w-full p-3 border rounded text-sm md:text-base"
                placeholder="Address"
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full p-3 text-white bg-blue-600 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
        {/* Right Section */}
        <div className="flex lg:flex-col w-full lg:w-1/2 bg-blue-100 items-center justify-center p-6">
          <div className="text-center">
            <div className="mb-4">
              <div className="bg-yellow-400 p-6 rounded-full text-white text-3xl">
                <FaBook /> {/* Book Icon */}
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Book Haven</h2>
            <p className="text-gray-600 text-sm md:text-base">Already have an account?</p>
            <Link to="/signin" className="text-blue-600 mt-2 inline-block hover:underline text-sm md:text-base">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
  
}
