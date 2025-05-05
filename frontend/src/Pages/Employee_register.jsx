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
    const { name, value } = e.target;
  
    if (name === "name") {
      if (!/^[a-zA-Z\s]*$/.test(value)) return; // Allow only letters and spaces
    }
  
    if (name === "phoneNumber") {
      if (!/^\d*$/.test(value) || value.length > 10) return; // Allow only numbers, max length 10
    }
  
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate phone number length
    if (formData.phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
  
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
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
        <div className="p-6 border-b border-indigo-400">
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

        <nav className="mt-6">
          <ul className="space-y-4">
            <li
              className="flex items-center p-4 hover:bg-green-600 rounded-md transition"
              onClick={() => navigate("/adminhome")}
            >
              {" "}
              <FaUserPlus className="text-white text-lg mr-3" />{" "}
              <span className="font-medium">Admin Home</span>
            </li>
            <li
              className="flex items-center p-4 bg-green-600 rounded-md transition"
              onClick={() => navigate("/employeeregister")}
            >
              {" "}
              <FaUserPlus className="text-white text-lg mr-3" />{" "}
              <span className="font-medium">Register Employee</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-green-600 rounded-md transition"
              onClick={() => navigate("/employeeview")}
            >
              {" "}
              <FaUsers className="text-white text-lg mr-3" />{" "}
              <span className="font-medium">View Employees</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-green-600 rounded-md transition"
              onClick={() => navigate("/userview")}
            >
              {" "}
              <FaUsers className="text-white text-lg mr-3" />{" "}
              <span className="font-medium">View Users</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-green-600 rounded-md transition"
              onClick={() => navigate("/order")}
            >
              {" "}
              <FaClipboardList className="text-white text-lg mr-3" />{" "}
              <span className="font-medium">View Orders</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl mx-auto border-t-8 border-green-500">
          <h1 className="text-3xl font-bold text-green-800 mb-8 text-center border-b pb-4">
            Employee Registration
          </h1>
          <form onSubmit={handleSubmit} className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-5">
                    {/* Section */}
                    <div className="relative">
                      <label htmlFor="section" className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaIdBadge className="h-5 w-5 text-green-500" />
                        </div>
                        <select
                          id="section"
                          name="section"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Department</option>
                          <option value="Service Manager">Service Manager</option>
                          <option value="Collect Manager">Collect Manager</option>
                          <option value="Product Manager">Product Manager</option>
                        </select>
                      </div>
                    </div>

                    {/* Company Number */}
                    <div className="relative">
                      <label htmlFor="companyNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Company ID
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaIdBadge className="h-5 w-5 text-green-500" />
                        </div>
                        <input
                          type="text"
                          id="companyNumber"
                          name="companyNumber"
                          placeholder="Company ID"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Name */}
                    <div className="relative">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="h-5 w-5 text-green-500" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Full Name"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          onChange={handleChange}
                          value={formData.name}
                          required
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="relative">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaHome className="h-5 w-5 text-green-500" />
                        </div>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          placeholder="Address"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-5">
                    {/* Phone Number */}
                    <div className="relative">
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhoneAlt className="h-5 w-5 text-green-500" />
                        </div>
                        <input
                          type="text"
                          id="phoneNumber"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          onChange={handleChange}
                          value={formData.phoneNumber}
                          maxLength="10"
                          required
                        />
                      </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="relative">
                      <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarAlt className="h-5 w-5 text-green-500" />
                        </div>
                        <input
                          type="date"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Gender */}
                    <div className="relative">
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="h-5 w-5 text-green-500" />
                        </div>
                        <select
                          id="gender"
                          name="gender"
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="mt-10">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Register Employee
                  </button>
                </div>
              </form>
        </div>
      </main>
    </div>
  );
}
