import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome, FaCheckCircle, FaPlus, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Service_order_confirm() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const staffName = localStorage.getItem('staffName');

  useEffect(() => {
    // Fetch all orders from the database
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/payment');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
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
            <h2 className="text-xl font-semibold">Welcome, {staffName}</h2>
            <p className="text-gray-300 text-sm">Dashboard</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button onClick={() => navigate('/Service_manager_home')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaHome className="mr-3" /> Home
          </button>
          <button onClick={() => navigate('/Service_add')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaPlus className="mr-3" /> Add Product
          </button>
          <button onClick={() => navigate('/Service_view')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaEye className="mr-3" /> View Products
          </button>
          <button onClick={() => navigate('/Service_order_confirm')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaCheckCircle className="mr-3" /> View Confirm Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full py-12 px-6">
        <div className="max-w-full w-full">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Order Confirmation</h1>
          {orders.length > 0 ? (
            <div className="w-full overflow-x-auto p-6 bg-white shadow-md rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-teal-100 text-gray-800 uppercase text-sm leading-normal">
                    <th className="border-b border-gray-200 p-6">Customer Email</th>
                    <th className="border-b border-gray-200 p-6">Services Title</th>
                    <th className="border-b border-gray-200 p-6">Customer Name</th>
                    <th className="border-b border-gray-200 p-6">Address</th>
                    <th className="border-b border-gray-200 p-6">Phone</th>
                    <th className="border-b border-gray-200 p-6">Total Price</th>
                    <th className="border-b border-gray-200 p-6">Bank Name</th>
                    <th className="border-b border-gray-200 p-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-teal-50 text-gray-700 text-sm">
                      <td className="border-b border-gray-200 p-6">{order.customerEmail}</td>
                      <td className="border-b border-gray-200 p-6">{order.bookTitle}</td>
                      <td className="border-b border-gray-200 p-6">{order.customerName}</td>
                      <td className="border-b border-gray-200 p-6">{order.customerAddress}</td>
                      <td className="border-b border-gray-200 p-6">{order.customerPhone}</td>
                      <td className="border-b border-gray-200 p-6 font-semibold text-teal-600">${order.totalPrice.toFixed(2)}</td>
                      <td className="border-b border-gray-200 p-6">{order.bankName}</td>
                      <td className="border-b border-gray-200 p-6">
                        <button
                          className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition transform hover:scale-105"
                          onClick={() => {
                            // Implement action logic for sending to collector here
                            alert(`Order ${order._id} sent to collector.`);
                          }}
                        >
                          Send to Collector
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-lg">No orders found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
