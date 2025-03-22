import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Collect_manager_home() {
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch confirmed orders from the backend
    const fetchConfirmedOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/confirm/confirmed-orders');
        setConfirmedOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching confirmed orders:', error);
      }
    };

    fetchConfirmedOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-blue-700 text-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-4 border-b border-blue-500 pb-4">
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <img src="src/images/profilelogo.png" alt="Profile Icon" className="rounded-full w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Welcome, Collector</h2>
            <p className="text-gray-300 text-sm">Dashboard</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button onClick={() => navigate('/Collect_manager_home')} className="flex items-center p-4 hover:bg-blue-600 rounded-md transition">
            <FaHome className="mr-3" /> Home
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full py-12 px-6">
        <div className="max-w-full w-full">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Confirmed Orders</h1>
          {confirmedOrders.length > 0 ? (
            <div className="w-full overflow-x-auto p-6 bg-white shadow-md rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-100 text-gray-800 uppercase text-sm leading-normal">
                    <th className="border-b border-gray-200 p-6">Customer Email</th>
                    <th className="border-b border-gray-200 p-6">Services Title</th>
                    <th className="border-b border-gray-200 p-6">Customer Name</th>
                    <th className="border-b border-gray-200 p-6">Address</th>
                    <th className="border-b border-gray-200 p-6">Phone</th>
                    <th className="border-b border-gray-200 p-6">Total Price</th>
                    <th className="border-b border-gray-200 p-6">Bank Name</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmedOrders.map((order) => (
                    <tr key={order.orderId} className="hover:bg-blue-50 text-gray-700 text-sm">
                      <td className="border-b border-gray-200 p-6">{order.customerEmail}</td>
                      <td className="border-b border-gray-200 p-6">{order.bookTitle}</td>
                      <td className="border-b border-gray-200 p-6">{order.customerName}</td>
                      <td className="border-b border-gray-200 p-6">{order.customerAddress}</td>
                      <td className="border-b border-gray-200 p-6">{order.customerPhone}</td>
                      <td className="border-b border-gray-200 p-6 font-semibold text-blue-600">${order.totalPrice.toFixed(2)}</td>
                      <td className="border-b border-gray-200 p-6">{order.bankName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-lg">No confirmed orders found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
