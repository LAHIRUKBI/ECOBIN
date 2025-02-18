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
      const employeeData = JSON.parse(userData);
      setEmployee(employeeData);
      setLoading(false);
    } else {
      console.error("No user data found in localStorage.");
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const handleMyPayments = () => {
    navigate("/mypayments");
  };

  if (loading) {
    return <div className="text-center text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-green-50 py-12 px-6 flex items-center justify-center">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden border border-green-200">
        {/* Header */}
        <div className="bg-teal-600 text-white rounded-t-lg p-8 text-center space-y-4">
          <FaUserCircle className="text-7xl mx-auto" />
          <h1 className="text-3xl font-bold tracking-wide">Welcome, {employee.email}!</h1>
          <p className="text-sm mt-2 font-medium">Your profile details and actions are below.</p>
        </div>

        {/* Profile Details */}
        <div className="p-8 grid gap-6 bg-green-100">
          <h2 className="text-xl font-semibold border-b pb-2">Profile Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-teal-500 text-xl" />
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <p className="text-gray-800">{employee.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone className="text-green-600 text-xl" />
              <div>
                <span className="font-medium text-gray-700">Phone:</span>
                <p className="text-gray-800">{employee.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-red-600 text-xl" />
              <div>
                <span className="font-medium text-gray-700">Address:</span>
                <p className="text-gray-800">{employee.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-8 bg-white flex flex-col sm:flex-row justify-evenly gap-6 shadow-md">
          <button
            onClick={() => navigate("/employeeupdateprofile")}
            className="flex-grow px-6 py-3 bg-teal-500 text-white rounded-lg shadow-lg hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Update Profile
          </button>
          <button
            onClick={handleMyPayments}
            className="flex-grow px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            My Payments
          </button>
          <button
            onClick={handleLogout}
            className="flex-grow px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Logout
          </button>
        </div>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl p-8 w-80 text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Are you sure you want to log out?
              </h2>
              <div className="flex justify-between gap-6">
                <button
                  onClick={confirmLogout}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200 transform hover:scale-105"
                >
                  Yes
                </button>
                <button
                  onClick={cancelLogout}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200 transform hover:scale-105"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
