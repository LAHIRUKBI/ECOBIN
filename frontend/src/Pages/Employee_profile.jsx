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
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        {/* Header */}
        <div className="bg-blue-600 text-white rounded-t-lg p-6 text-center">
          <FaUserCircle className="text-7xl mx-auto" />
          <h1 className="text-2xl font-bold mt-4">Welcome, {employee.email}!</h1>
          <p className="text-sm mt-2">Your profile details and actions are below.</p>
        </div>

        {/* Profile Details */}
        <div className="p-6 grid gap-6">
          <h2 className="text-xl font-semibold border-b pb-2">Profile Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              <span className="font-medium">Email:</span>
              <span>{employee.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-green-500" />
              <span className="font-medium">Phone:</span>
              <span>{employee.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              <span className="font-medium">Address:</span>
              <span>{employee.address}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 flex flex-col sm:flex-row justify-evenly gap-4">
          <button
            onClick={() => navigate("/employeeupdateprofile")}
            className="flex-grow px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Update Profile
          </button>
          <button
            onClick={handleMyPayments}
            className="flex-grow px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            My Payments
          </button>
          <button
            onClick={handleLogout}
            className="flex-grow px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
              <h2 className="text-xl font-semibold mb-4">
                Are you sure you want to log out?
              </h2>
              <div className="flex justify-between gap-4">
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Yes
                </button>
                <button
                  onClick={cancelLogout}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200"
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
