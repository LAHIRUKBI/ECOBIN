import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import { FaUserPlus, FaUsers, FaClipboardList, FaUser, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function User_view() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/signup/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Remove user handler
  const handleRemoveUser = async (id) => {
    const confirm = window.confirm("Are you sure you want to remove this user?");
    if (confirm) {
      try {
        await axios.delete(`http://localhost:3000/api/employees/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        alert("User removed successfully.");
      } catch (error) {
        console.error("Error removing user:", error);
        alert("Failed to remove user.");
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
              <div className="p-6 border-b border-indigo-400">
                <div className="flex items-center space-x-4">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
                    <img src="src/images/profilelogo.png" alt="Profile Icon" className="rounded-full w-full h-full object-cover" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Admin</h2>
                    <p className="text-gray-300 text-sm">Admin Dashboard</p>
                  </div>
                </div>
              </div>
      
              <nav className="mt-6">
                <ul className="space-y-4">
                  <li className="flex items-center p-4 hover:bg-green-600 rounded-md transition" onClick={() => navigate("/adminhome")}> <FaUserPlus className="text-white text-lg mr-3" /> <span className="font-medium">Admin Home</span></li>
                  <li className="flex items-center p-4 hover:bg-green-600 rounded-md transition" onClick={() => navigate("/employeeregister")}> <FaUserPlus className="text-white text-lg mr-3" /> <span className="font-medium">Register Employee</span></li>
                  <li className="flex items-center p-4 hover:bg-green-600 rounded-md transition" onClick={() => navigate("/employeeview")}> <FaUsers className="text-white text-lg mr-3" /> <span className="font-medium">View Employees</span></li>
                  <li className="flex items-center p-4 bg-green-600 rounded-md transition" onClick={() => navigate("/userview")}> <FaUsers className="text-white text-lg mr-3" /> <span className="font-medium">View Users</span></li>
                  <li className="flex items-center p-4 hover:bg-green-600 rounded-md transition" onClick={() => navigate("/order")}> <FaClipboardList className="text-white text-lg mr-3" /> <span className="font-medium">View Orders</span></li>
                </ul>
              </nav>
            </aside>

      {/* Main Content */}
      {/* Main Content */}
      <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-10 text-center">
              <h1 className="text-3xl font-bold text-green-800 mb-2">User Management</h1>
              <p className="text-gray-600">View and manage all registered users</p>
            </div>

            {/* User Cards */}
            {users.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                  >
                    {/* User Header */}
                    <div className="bg-gradient-to-r from-green-600 to-green-500 p-4">
                      <div className="flex items-center">
                        <div className="bg-white/20 p-2 rounded-full mr-3">
                          <FaUser className="text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-white truncate">{user.email}</h2>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="bg-blue-100 p-2 rounded-full mr-3">
                            <FaPhone className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Phone</p>
                            <p className="text-gray-800">{user.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-green-100 p-2 rounded-full mr-3">
                            <FaMapMarkerAlt className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Address</p>
                            <p className="text-gray-800">{user.address}</p>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-6">
                        <button
                          onClick={() => handleRemoveUser(user._id)}
                          className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors duration-200 flex items-center justify-center"
                        >
                          Remove User
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-600">No users found</p>
              </div>
            )}
          </div>
        </main>
    </div>
  );
}
