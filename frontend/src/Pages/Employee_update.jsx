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
        const response = await axios.get(`http://localhost:3000/api/employees/${id}`);
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/employees/${id}`, formData);
      alert("Employee updated successfully.");
      navigate("/employeeview");  // Navigate back to employee view page after success
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form Fields */}
              <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                <input
                  type="text"
                  id="companyNumber"
                  name="companyNumber"
                  placeholder="Company ID"
                  className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.companyNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  placeholder="Gender"
                  className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.gender}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center gap-4 bg-gray-100 p-3 rounded-md shadow-lg">
                <input
                  type="text"
                  id="section"
                  name="section"
                  placeholder="Section"
                  className="w-full bg-transparent focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={formData.section}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-md shadow hover:shadow-lg transition-transform transform hover:scale-105"
            >
              Update
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
