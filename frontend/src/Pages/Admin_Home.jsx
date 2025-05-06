import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaUserPlus, FaClipboardList } from "react-icons/fa";
import axios from "axios";

export default function Admin_Home() {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(0);
  const [employeeCount, setEmployeeCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/signup/count");
        const data = await response.json();
        setUserCount(data.count);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    const fetchEmployeeCount = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/employees/count"
        );
        const data = await response.json();
        setEmployeeCount(data.count);
      } catch (error) {
        console.error("Error fetching employee count:", error);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/payment");
        setOrders(response.data.data);
      } catch (error) {
        setErrorOrders("Error fetching order details");
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchUserCount();
    fetchEmployeeCount();
    fetchOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 mt-20">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-green-700 to-green-600 text-white shadow-xl">
        <div className="p-6 border-b border-green-600">
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-md">
              <img 
                src="src/images/profilelogo.png" 
                alt="Profile Icon" 
                className="rounded-full w-full h-full object-cover border-2 border-white"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Admin</h2>
              <p className="text-green-100 text-xs">Administrator</p>
            </div>
          </div>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li 
              className="flex items-center p-3 rounded-lg bg-green-600 text-white cursor-pointer transition-all duration-200 hover:bg-green-500 hover:shadow-md"
              onClick={() => navigate("/adminhome")}
            >
              <FaUserPlus className="text-white text-lg mr-3" />
              <span className="font-medium">Dashboard</span>
            </li>
            <li 
              className="flex items-center p-3 rounded-lg text-green-100 cursor-pointer transition-all duration-200 hover:bg-green-500 hover:text-white hover:shadow-md"
              onClick={() => navigate("/employeeregister")}
            >
              <FaUserPlus className="text-lg mr-3" />
              <span className="font-medium">Register Employee</span>
            </li>
            <li 
              className="flex items-center p-3 rounded-lg text-green-100 cursor-pointer transition-all duration-200 hover:bg-green-500 hover:text-white hover:shadow-md"
              onClick={() => navigate("/employeeview")}
            >
              <FaUsers className="text-lg mr-3" />
              <span className="font-medium">View Employees</span>
            </li>
            <li 
              className="flex items-center p-3 rounded-lg text-green-100 cursor-pointer transition-all duration-200 hover:bg-green-500 hover:text-white hover:shadow-md"
              onClick={() => navigate("/userview")}
            >
              <FaUsers className="text-lg mr-3" />
              <span className="font-medium">View Users</span>
            </li>
            <li 
              className="flex items-center p-3 rounded-lg text-green-100 cursor-pointer transition-all duration-200 hover:bg-green-500 hover:text-white hover:shadow-md"
              onClick={() => navigate("/order")}
            >
              <FaClipboardList className="text-lg mr-3" />
              <span className="font-medium">View Orders</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-teal-500 p-6 rounded-xl shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L3 7v9c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-9-5z"></path>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-green-100">Welcome back, Administrator</p>
              </div>
            </div>
            <div className="bg-white/10 p-3 rounded-lg">
              <p className="text-white font-medium">Last updated: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Users Card */}
          <div 
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate("/userview")}
          >
            <div className="p-6 flex items-start">
              <div className="bg-blue-100 p-4 rounded-full mr-4">
                <FaUserPlus className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Registered Users</h3>
                <p className="mt-2">
                  <span className="text-3xl font-bold text-blue-600">{userCount}</span>
                  <span className="text-gray-500 ml-2">users</span>
                </p>
              </div>
            </div>
            <div className="bg-blue-50 px-4 py-2 text-sm text-blue-600">
              View all users →
            </div>
          </div>

          {/* Employees Card */}
          <div 
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate("/employeeview")}
          >
            <div className="p-6 flex items-start">
              <div className="bg-green-100 p-4 rounded-full mr-4">
                <FaUsers className="text-green-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Registered Employees</h3>
                <p className="mt-2">
                  <span className="text-3xl font-bold text-green-600">{employeeCount}</span>
                  <span className="text-gray-500 ml-2">employees</span>
                </p>
              </div>
            </div>
            <div className="bg-green-50 px-4 py-2 text-sm text-green-600">
              View all employees →
            </div>
          </div>

          {/* Orders Card */}
          <div 
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => navigate("/order")}
          >
            <div className="p-6 flex items-start">
              <div className="bg-purple-100 p-4 rounded-full mr-4">
                <FaClipboardList className="text-purple-600 text-2xl" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700">Current Orders</h3>
                <p className="mt-2">
                  <span className="text-3xl font-bold text-purple-600">
                    {loadingOrders ? (
                      <span className="inline-block h-8 w-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></span>
                    ) : (
                      orders.length
                    )}
                  </span>
                  <span className="text-gray-500 ml-2">orders</span>
                </p>
                {errorOrders && <p className="text-red-500 text-sm mt-1">{errorOrders}</p>}
              </div>
            </div>
            <div className="bg-purple-50 px-4 py-2 text-sm text-purple-600">
              View all orders →
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}