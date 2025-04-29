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
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-200 py-10 px-6 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl flex w-full max-w-5xl overflow-hidden">
        {/* Left Panel (Visual) */}
        <div className="hidden md:flex flex-col items-center justify-center bg-green-600 text-white p-10 w-1/2">
          <FaUserEdit className="text-6xl mb-4" />
          <h2 className="text-3xl font-bold mb-2">Employee Profile</h2>
          <p className="text-center text-lg">Update your contact details below</p>
        </div>

        {/* Right Panel (Form) */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h3 className="text-2xl font-bold text-green-700 mb-6 text-center">
            Update Your Profile
          </h3>

          <div className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Email (Read-only)
              </label>
              <div className="flex items-center bg-green-100 rounded-lg px-4 py-2">
                <FaEnvelope className="text-green-500 mr-3" />
                <input
                  type="text"
                  value={employee.email}
                  disabled
                  className="bg-transparent w-full text-green-800 outline-none"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Phone
              </label>
              <div className="flex items-center bg-green-50 border border-green-300 rounded-lg px-4 py-2">
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
                  className="bg-transparent w-full text-green-800 outline-none"
                  placeholder="Enter your phone number"
                  maxLength={10}
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-green-800 mb-1">
                Address
              </label>
              <div className="flex items-center bg-green-50 border border-green-300 rounded-lg px-4 py-2">
                <FaMapMarkerAlt className="text-green-500 mr-3" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-transparent w-full text-green-800 outline-none"
                  placeholder="Enter your address"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => navigate("/employee_profile/:username")}
              className="w-1/2 mr-2 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="w-1/2 ml-2 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition shadow"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
