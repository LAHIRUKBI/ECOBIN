import React, { useEffect, useState } from 'react';
import { FaHome, FaBox, FaPlus  } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Collect_manager_home() {
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    const fetchConfirmedOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/confirm/confirmed-orders');
        setOrderCount(response.data.data.length);
      } catch (error) {
        console.error('Error fetching confirmed orders:', error);
      }
    };

    fetchConfirmedOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-4 border-b border-green-500 pb-4">
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <img src="src/images/profilelogo.png" alt="Profile Icon" className="rounded-full w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Welcome, Collect Manager</h2>
            <p className="text-gray-300 text-sm">Dashboard</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button onClick={() => navigate('/collectmanagerhome')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaHome className="mr-3" /> Home
          </button>
          <button onClick={() => navigate('/Collect_manager_orders')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaBox className="mr-3" /> Orders
          </button>
          <button onClick={() => navigate('/Collect_add_reusable')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaPlus  className="mr-3" /> Add Reusables
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full py-12 px-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Maneth Home Page</h1>
        {/* Orders Count Card */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
          <h2 className="text-2xl font-bold text-gray-700">Total Confirmed Orders</h2>
          <p className="text-3xl font-extrabold text-blue-600 mt-2">{orderCount}</p>
        </div>
      </main>
    </div>
  );
}
