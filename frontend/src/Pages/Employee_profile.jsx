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
    return <div className="flex items-center justify-center h-screen text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-green-400 text-white text-center py-12 px-6">
          <FaUserCircle className="text-8xl mx-auto mb-4" />
          <h1 className="text-3xl font-semibold">Welcome, {employee?.email}!</h1>
          <p className="text-lg mt-2">Manage your profile and perform actions below.</p>
        </div>

        {/* Profile Details */}
        <div className="p-10 bg-gray-50">
          <h2 className="text-2xl font-semibold mb-6 text-teal-600 border-b-2 border-teal-500 pb-3">Profile Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="flex items-center gap-6 p-5 bg-white rounded-lg shadow-xl">
              <FaEnvelope className="text-teal-600 text-2xl" />
              <div>
                <span className="text-gray-600 text-lg">Email:</span>
                <p className="font-medium text-gray-800">{employee?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-5 bg-white rounded-lg shadow-xl">
              <FaPhone className="text-teal-600 text-2xl" />
              <div>
                <span className="text-gray-600 text-lg">Phone:</span>
                <p className="font-medium text-gray-800">{employee?.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 p-5 bg-white rounded-lg shadow-xl">
              <FaMapMarkerAlt className="text-red-600 text-2xl" />
              <div>
                <span className="text-gray-600 text-lg">Address:</span>
                <p className="font-medium text-gray-800">{employee?.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-8 bg-white flex flex-col sm:flex-row justify-evenly gap-6 border-t-4 border-teal-500">
          <button onClick={() => navigate("/employeeupdateprofile")} className="px-6 py-4 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-600 transition duration-300 transform hover:scale-105">
            Update Profile
          </button>
          <button onClick={handleMyPayments} className="px-6 py-4 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105">
            My Payments
          </button>
          <button onClick={handleMyOrders} className="px-6 py-4 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600 transition duration-300 transform hover:scale-105">
            My Orders
          </button>
          <button onClick={handleLogout} className="px-6 py-4 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105">
            Logout
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-96 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-between">
              <button onClick={confirmLogout} className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition transform hover:scale-105">
                Yes
              </button>
              <button onClick={cancelLogout} className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition transform hover:scale-105">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
