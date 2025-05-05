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
    return <div className="flex items-center justify-center h-screen text-xl font-semibold text-gray-700">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 py-12 px-8 text-center">
            <div className="flex justify-center">
              <FaUserCircle className="text-8xl text-white opacity-90 hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white tracking-tight">
              {employee?.name || 'Employee Profile'}
            </h1>
            <p className="mt-2 text-blue-100 text-lg">
              {employee?.position || 'Your professional dashboard'}
            </p>
          </div>

          {/* Profile Details Section */}
          <div className="px-8 py-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 pb-2 border-b border-gray-200">
              Personal Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex items-start space-x-5 p-5 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-300">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaEnvelope className="text-blue-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {employee?.email || 'Not provided'}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-5 p-5 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-300">
                <div className="flex-shrink-0">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaPhone className="text-green-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {employee?.phone || 'Not provided'}
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-5 p-5 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors duration-300 md:col-span-2">
                <div className="flex-shrink-0">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-purple-600 text-xl" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {employee?.address || 'Not provided'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/employeeupdateprofile")}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex items-center"
              >
                <span>Update Profile</span>
              </button>
              <button
                onClick={handleMyPayments}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex items-center"
              >
                <span>My Payments</span>
              </button>
              <button
                onClick={handleMyOrders}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex items-center"
              >
                <span>My Orders</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex items-center"
              >
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl transform transition-all duration-300 scale-95 hover:scale-100">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Confirm Logout</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to sign out of your account?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={cancelLogout}
                  className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-300"
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