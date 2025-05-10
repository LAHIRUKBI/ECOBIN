import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome, FaCheckCircle, FaTrash, FaUser, FaRecycle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Collect_manager_home() {
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [separatedOrders, setSeparatedOrders] = useState([]);
  const navigate = useNavigate();
  const staffName = localStorage.getItem('staffName');

  useEffect(() => {
    fetchConfirmedOrders();
    fetchSeparatedOrders();
  }, []);

  const fetchConfirmedOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/confirm/confirmed-orders');
      setConfirmedOrders(response.data.data);
    } catch (error) {
      console.error('Error fetching confirmed orders:', error);
    }
  };

  const fetchSeparatedOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/separation');
      const separatedOrderIds = response.data.map(record => record.orderId);
      setSeparatedOrders(separatedOrderIds);
    } catch (error) {
      console.error('Error fetching separated orders:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:3000/api/confirm/confirmed-orders/${orderId}`);
      setConfirmedOrders(confirmedOrders.filter(order => order.orderId !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleSeparate = async (orderId) => {
    try {
      await axios.post('http://localhost:3000/api/separation', {
        orderId,
        weights: {
          plastic: 0,
          paper: 0,
          glass: 0,
          metal: 0,
          organic: 0
        }
      });
      setSeparatedOrders([...separatedOrders, orderId]);
    } catch (error) {
      console.error('Error marking order as separated:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-4 border-b border-green-500 pb-4">
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <FaUser className="w-8 h-8 text-green-700" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{staffName}</h2>
            <p className="text-gray-300 text-sm">Collection Manager</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button onClick={() => navigate('/Collect_manager_home')} className="flex items-center p-4 bg-green-600 rounded-md transition">
            <FaHome className="mr-3" /> Home
          </button>
          <button onClick={() => navigate('/Service_order_confirm')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaCheckCircle className="mr-3" /> View Orders
          </button>
          <button onClick={() => navigate('/separation')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaRecycle className="mr-3" /> Separation
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Confirmed Collection Orders</h1>
            <div className="text-sm text-gray-500">
              Total Orders: {confirmedOrders.length}
            </div>
          </div>

          {confirmedOrders.length > 0 ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {confirmedOrders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.orderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.customerEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.bookTitle}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customerPhone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.customerAddress}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                          ${order.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.bankName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-end">
                            {separatedOrders.includes(order.orderId) ? (
                              <button
                                disabled
                                className="text-gray-400 bg-gray-100 px-3 py-1 rounded-full cursor-not-allowed"
                              >
                                <FaRecycle className="inline-block mr-1" />
                                Separated
                              </button>
                            ) : (
                              <button
                                onClick={() => navigate(`/separation/${order.orderId}`)}
                                className="text-green-600 hover:text-green-900 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-full transition-colors duration-200"
                              >
                                <FaRecycle className="inline-block mr-1" />
                                Separate
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteOrder(order.orderId)}
                              className="text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 px-3 py-1 rounded-full transition-colors duration-200"
                            >
                              <FaTrash className="inline-block mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <FaCheckCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
              <p className="mt-1 text-sm text-gray-500">No confirmed orders have been assigned yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
