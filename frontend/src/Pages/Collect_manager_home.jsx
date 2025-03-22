import React, { useEffect, useState } from 'react';
import { FaHome, FaBox, FaPlus, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Collect_manager_home() {
  const navigate = useNavigate();
  const [orderCount, setOrderCount] = useState(0);
  const [materialTotals, setMaterialTotals] = useState({});
  const [reusablesCount, setReusablesCount] = useState(0); // State for total reusables

  useEffect(() => {
    const fetchConfirmedOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/confirm/confirmed-orders');
        setOrderCount(response.data.data.length);
      } catch (error) {
        console.error('Error fetching confirmed orders:', error);
      }
    };

    const fetchReusables = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/reuse/list');
        
        const totals = {};
        let count = response.data.length; // Count total reusable items

        response.data.forEach((item) => {
          Object.keys(item).forEach((category) => {
            if (category !== 'date') {
              if (!totals[category]) {
                totals[category] = { amount: 0, unit: item[category].unit };
              }
              totals[category].amount += item[category].amount;
            }
          });
        });

        setMaterialTotals(totals);
        setReusablesCount(count); // Store count of reusables
      } catch (error) {
        console.error('Error fetching reusable data:', error);
      }
    };

    fetchConfirmedOrders();
    fetchReusables();
  }, []);

  const chartData = Object.keys(materialTotals).map((key) => ({
    name: key,
    amount: materialTotals[key].amount,
  }));

  return (
    <div className="flex min-h-screen bg-gray-100">
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
            <FaPlus className="mr-3" /> Add Reusables
          </button>
          <button onClick={() => navigate('/Collect_view_lists')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaEye className="mr-3" /> View Reusables
          </button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col items-center justify-center w-full py-12 px-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Collect Manager Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Confirmed Orders */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
            <h2 className="text-2xl font-bold text-gray-700">Total Confirmed Orders</h2>
            <p className="text-3xl font-extrabold text-blue-600 mt-2">{orderCount}</p>
          </div>

          {/* Total Reusables Collected */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-80 text-center">
            <h2 className="text-2xl font-bold text-gray-700">Total Reusables Collected</h2>
            <p className="text-3xl font-extrabold text-green-600 mt-2">{reusablesCount}</p>
          </div>
        </div>

        {/* Bar Chart for Material Breakdown */}
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-semibold text-green-600 mb-4">Total Reusable Materials</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#34D399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </main>
    </div>
  );
}
