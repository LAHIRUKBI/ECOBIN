import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Employee_update() {
  const { id } = useParams(); // Get the employee ID from the URL params
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

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/employees/${id}`
        );
        if (response.data) {
          setFormData(response.data);
        } else {
          alert("Employee not found.");
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        alert("Error fetching employee data.");
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "phoneNumber") {
      if (!/^\d*$/.test(value)) return; // Allow only numeric values
      if (value.length > 10) return; // Restrict to 10 characters
    }
  
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.phoneNumber.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }
  
    try {
      await axios.put(`http://localhost:3000/api/employees/${id}`, formData);
      alert("Employee updated successfully.");
      navigate("/employeeview"); 
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee.");
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
        {/* Sidebar content */}
      </aside>

      <main className="flex-1 p-8">
        <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-4xl mx-auto border-t-8 border-green-500">
          <h1 className="text-3xl font-bold text-green-800 mb-8 text-center border-b pb-4">
            Update Employee
          </h1>
          <form onSubmit={handleSubmit} className="space-y-8 p-6 bg-gray-50 rounded-lg shadow-lg max-w-3xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* First Part - Personal Info */}
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="companyNumber" className="text-gray-700 font-semibold">Company ID Number:</label>
        <input
          type="text"
          id="companyNumber"
          name="companyNumber"
          placeholder="Company ID"
          className="w-full bg-white border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.companyNumber}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-gray-700 font-semibold">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className="w-full bg-white border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="address" className="text-gray-700 font-semibold">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Address"
          className="w-full bg-white border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
  <label htmlFor="gender" className="text-gray-700 font-semibold">Gender:</label>
  <select
    id="gender"
    name="gender"
    className="w-full bg-white border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
    value={formData.gender}
    onChange={handleChange}
  >
    <option value="">Select Gender</option>
    <option value="male">Male</option>
    <option value="female">Female</option>
    <option value="other">Other</option>
  </select>
</div>

    </div>

    {/* Second Part - Contact Info & Position */}
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="phoneNumber" className="text-gray-700 font-semibold">Phone Number:</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone Number"
          className="w-full bg-white border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="dateOfBirth" className="text-gray-700 font-semibold">Date of Birth:</label>
        <input
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          className="w-full bg-white border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.dateOfBirth}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]} // this sets max to today's date
        />
      </div>

      <div className="flex flex-col gap-2">
  <label htmlFor="section" className="text-gray-700 font-semibold">Position:</label>
  <select
    id="section"
    name="section"
    className="w-full bg-white border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
    value={formData.section}
    onChange={handleChange}
  >
    <option value="">Select Section</option>
    <option value="Service Manager">Service Manager</option>
    <option value="Collect Manager">Collect Manager</option>
    <option value="Product Manager">Product Manager</option>
  </select>
</div>

    </div>
  </div>

  <button
    type="submit"
    className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-md shadow-lg hover:shadow-xl focus:outline-none transition-all transform hover:scale-105"
  >
    Update
  </button>
</form>

        </div>
      </main>
    </div>
  );
}
