import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBoxOpen,
  FaSignOutAlt,
  FaUserEdit,
  FaChartLine
} from "react-icons/fa";
import { motion } from "framer-motion";

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
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-teal-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full"
        ></motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Profile Card - Now properly centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          {/* Header with decorative elements */}
          <div className="relative bg-gradient-to-r from-green-400 to-teal-500 py-8 px-6 text-center">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-4 left-4 w-16 h-16 rounded-full bg-white"></div>
              <div className="absolute bottom-6 right-6 w-24 h-24 rounded-full bg-white"></div>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative inline-block"
            >
              <div className="relative w-24 h-24 mx-auto rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30">
                <FaUserCircle className="w-full h-full text-white/90 p-4" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold text-white shadow-md">
                PRO
              </div>
            </motion.div>
            
            <motion.h1 
              className="mt-4 text-2xl font-bold text-white tracking-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {employee?.name || "Employee Profile"}
            </motion.h1>
            <p className="mt-2 text-green-100 text-sm font-medium">
              {employee?.position || "Your professional dashboard"}
            </p>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-8">
            <div className="flex items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center">
                <FaChartLine className="mr-2 text-green-500" />
                Personal Information
              </h2>
              <div className="ml-auto h-px flex-1 bg-gradient-to-r from-transparent via-green-200 to-transparent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email */}
              <motion.div
                whileHover={{ y: -3 }}
                className="flex items-start space-x-4 p-4 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 hover:border-green-300 transition-all shadow-sm"
              >
                <div className="bg-green-100 p-3 rounded-xl">
                  <FaEnvelope className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address</h3>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {employee?.email || "Not provided"}
                  </p>
                </div>
              </motion.div>

              {/* Phone */}
              <motion.div
                whileHover={{ y: -3 }}
                className="flex items-start space-x-4 p-4 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 hover:border-green-300 transition-all shadow-sm"
              >
                <div className="bg-green-100 p-3 rounded-xl">
                  <FaPhone className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone Number</h3>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {employee?.phone || "Not provided"}
                  </p>
                </div>
              </motion.div>

              {/* Address */}
              <motion.div
                whileHover={{ y: -3 }}
                className="flex items-start space-x-4 p-4 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 hover:border-green-300 transition-all shadow-sm md:col-span-2"
              >
                <div className="bg-green-100 p-3 rounded-xl">
                  <FaMapMarkerAlt className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Address</h3>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {employee?.address || "Not provided"}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-6 bg-gradient-to-r from-green-50 to-teal-50 border-t border-gray-100">
            <div className="flex flex-wrap justify-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/employeeupdateprofile")}
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white text-sm font-medium rounded-xl shadow-md transition-all"
              >
                <FaUserEdit className="mr-2" />
                Update Profile
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMyPayments}
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white text-sm font-medium rounded-xl shadow-md transition-all"
              >
                <FaMoneyBillWave className="mr-2" />
                My Payments
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleMyOrders}
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white text-sm font-medium rounded-xl shadow-md transition-all"
              >
                <FaBoxOpen className="mr-2" />
                My Orders
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium rounded-xl shadow-md transition-all"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Logout Modal */}
      {showLogoutModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl"
          >
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <FaSignOutAlt className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Ready to leave?</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to sign out of your account?
              </p>
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cancelLogout}
                  className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-xl transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmLogout}
                  className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium rounded-xl shadow transition-all"
                >
                  Yes, Logout
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}