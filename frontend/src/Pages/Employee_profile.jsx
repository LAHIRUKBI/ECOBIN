import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function EmployeeProfile() {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      setEmployee(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogout = () => setShowLogoutModal(true);
  const confirmLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const cancelLogout = () => setShowLogoutModal(false);
  const handleMyPayments = () => navigate("/mypayments");
  const handleMyOrders = () => navigate("/myItemOrderDetails");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-base font-medium text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white px-4 flex justify-center items-center">
      <div className="w-full max-w-4xl">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg mx-auto">
          {/* Header with soft green gradient */}
          <div className="bg-gradient-to-r from-green-500 to-teal-400 py-10 px-6 text-center">
            <div className="flex justify-center">
              <FaUserCircle className="text-6xl text-white opacity-90 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h1 className="mt-3 text-2xl font-semibold text-white tracking-tight">
              {employee?.name || "Employee Profile"}
            </h1>
            <p className="mt-1 text-green-100 text-sm">
              {employee?.position || "Your professional dashboard"}
            </p>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-6 border-b pb-2 border-gray-200">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-100 hover:border-green-300 transition">
                <div className="bg-green-200 p-2 rounded-full">
                  <FaEnvelope className="text-green-700 text-base" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500">Email Address</h3>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {employee?.email || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-100 hover:border-green-300 transition">
                <div className="bg-green-200 p-2 rounded-full">
                  <FaPhone className="text-green-700 text-base" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500">Phone Number</h3>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {employee?.phone || "Not provided"}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-100 hover:border-green-300 transition md:col-span-2">
                <div className="bg-green-200 p-2 rounded-full">
                  <FaMapMarkerAlt className="text-green-700 text-base" />
                </div>
                <div>
                  <h3 className="text-xs font-medium text-gray-500">Address</h3>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {employee?.address || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-green-50 border-t border-gray-100">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => navigate("/employeeupdateprofile")}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg shadow transition"
              >
                Update Profile
              </button>
              <button
                onClick={handleMyPayments}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-medium rounded-lg shadow transition"
              >
                My Payments
              </button>
              <button
                onClick={handleMyOrders}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg shadow transition"
              >
                My Orders
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-5 shadow-lg transform transition duration-300">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Confirm Logout</h3>
              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex justify-center space-x-3">
                <button
                  onClick={cancelLogout}
                  className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
