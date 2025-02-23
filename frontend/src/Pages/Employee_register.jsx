import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaUserPlus,
  FaUsers,
  FaPhoneAlt,
  FaHome,
  FaCalendarAlt,
  FaIdBadge,
  FaClipboardList,
} from "react-icons/fa"; // Import Font Awesome icons
import { useNavigate } from "react-router-dom";

export default function Employee_register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyNumber: "",
    name: "",
    address: "",
    gender: "",
    phoneNumber: "",
    dateOfBirth: "",
    section: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/employees/register",
        formData
      );
      alert(response.data.message);
      navigate("/adminhome");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-green-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-green-600 to-teal-500 text-white shadow-xl">
        {/* Profile Section */}
        <div className="p-6 border-b border-teal-400">
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
              <img
                src="src/images/profilelogo.png"
                alt="Profile Icon"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Admin</h2>
              <p className="text-gray-300 text-sm">Admin Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-6">
          <ul className="space-y-4">
            <li
              className="flex items-center p-4 hover:bg-teal-400 rounded-md cursor-pointer transition-all"
              onClick={() => navigate("/adminhome")}
            >
              <FaUserPlus className="text-white text-lg mr-3" />
              <span className="font-medium">Admin Home</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-teal-400 rounded-md cursor-pointer transition-all"
              onClick={() => navigate("/employeeregister")}
            >
              <FaUserPlus className="text-white text-lg mr-3" />
              <span className="font-medium">Register Employee</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-teal-400 rounded-md cursor-pointer transition-all"
              onClick={() => navigate("/employeeview")}
            >
              <FaUsers className="text-white text-lg mr-3" />
              <span className="font-medium">View Employees</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-teal-400 rounded-md cursor-pointer transition-all"
              onClick={() => navigate("/userview")}
            >
              <FaUsers className="text-white text-lg mr-3" />
              <span className="font-medium">View Users</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-teal-400 rounded-md cursor-pointer transition-all"
              onClick={() => navigate("/order")}
            >
              <FaClipboardList className="text-white text-lg mr-3" />
              <span className="font-medium">View Orders</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white shadow-xl rounded-lg p-10 w-full max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-green-800 mb-8 text-center border-b pb-4">
            Employee Registration
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                  <FaIdBadge className="text-teal-600" />
                  <select
                    id="section"
                    name="section"
                    className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={handleChange}
                  >
                    <option value="">Select Section</option>
                    <option value="Stock and product Manager">Stock and product Manager</option>
                    <option value="Collect Manager">Collect Manager</option>
                  </select>
                </div>
                <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                  <FaIdBadge className="text-teal-600" />
                  <input
                    type="text"
                    id="companyNumber"
                    name="companyNumber"
                    placeholder="Enter Company ID"
                    className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                  <FaUser className="text-teal-600" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter Name"
                    className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                  <FaHome className="text-teal-600" />
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter Address"
                    className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                  <FaPhoneAlt className="text-teal-600" />
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    placeholder="Enter Phone Number"
                    className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                  <FaCalendarAlt className="text-teal-600" />
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                  <FaUser className="text-teal-600" />
                  <select
                    id="gender"
                    name="gender"
                    className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-md shadow hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Register
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
