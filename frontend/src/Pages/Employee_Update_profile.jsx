import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserEdit } from "react-icons/fa";

export default function Employee_Update_profile() {
  const [employee, setEmployee] = useState({});
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setEmployee(userData);
      setPhone(userData.phone || "");
      setAddress(userData.address || "");
    }
  }, []);

  const handleUpdate = async () => {
    if (phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
    try {
      const response = await axios.put(
        `http://localhost:3000/api/signup/profile/${employee.email}`,
        { phone, address }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/employee_profile/:username");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br py-12 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-lg border border-green-300">
        {/* Header */}
        <div className="flex items-center justify-center mb-8">
          <FaUserEdit className="text-5xl text-green-600" />
          <h2 className="text-3xl font-bold text-green-800 ml-3">Update Profile</h2>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-green-700">Email (Read-only)</label>
            <div className="flex items-center mt-2 bg-green-100 rounded-lg p-3">
              <FaEnvelope className="text-green-500 mr-3" />
              <input
                type="text"
                value={employee.email}
                disabled
                className="w-full bg-transparent text-green-700 outline-none"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-green-700">Phone</label>
            <div className="flex items-center mt-2 bg-green-50 border border-green-300 rounded-lg p-3">
              <FaPhone className="text-green-500 mr-3" />
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  const input = e.target.value;
                  if (/^\d{0,10}$/.test(input)) {
                    setPhone(input);
                  }
                }}
                className="w-full bg-transparent text-green-700 outline-none"
                placeholder="Enter your phone number"
                maxLength={10}
              />
            </div>
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-sm font-semibold text-green-700">Address</label>
            <div className="flex items-center mt-2 bg-green-50 border border-green-300 rounded-lg p-3">
              <FaMapMarkerAlt className="text-green-500 mr-3" />
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-transparent text-green-700 outline-none"
                placeholder="Enter your address"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => navigate("/employee_profile/:username")}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-200 shadow"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
