import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHome, FaBox, FaPlus, FaEye   } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Collect_manager_orders() {
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [messages, setMessages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
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

  const calculateRemainingTime = (confirmationDate) => {
    const now = new Date();
    const confirmationTime = new Date(confirmationDate);
    const timeDiff = confirmationTime.getTime() + (3 * 24 * 60 * 60 * 1000) - now.getTime(); // 3 days in milliseconds

    if (timeDiff <= 0) {
      return 'Expired';
    }

    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  const handleSendMessage = (orderId) => {
    alert(`Message sent for order ${orderId}: ${messages[orderId]}`);
    setMessages((prev) => ({ ...prev, [orderId]: '' }));
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/confirm/confirmed-orders/${orderId}`);
      alert('Order deleted successfully');
      setConfirmedOrders((prevOrders) => prevOrders.filter(order => order.orderId !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Error deleting order');
    }
  };

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
                  <FaPlus  className="mr-3" /> Add Reusables
                </button>
                <button onClick={() => navigate('/Collect_view_lists')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
                  <FaEye  className="mr-3" /> View Reusables
                </button>
              </nav>
            </aside>

      <main className="flex-1 flex flex-col items-center justify-center w-full py-12 px-6">
        <div className="max-w-full w-full">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Confirmed Orders</h1>
          {confirmedOrders.length > 0 ? (
            <div className="w-full overflow-x-auto p-6 bg-white shadow-md rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-blue-100 text-gray-800 uppercase text-sm leading-normal">
                    <th className="border-b border-gray-200 p-6">Booking ID</th>
                    <th className="border-b border-gray-200 p-6">Customer Email</th>
                    <th className="border-b border-gray-200 p-6">Services Title</th>
                    <th className="border-b border-gray-200 p-6">Customer Name</th>
                    <th className="border-b border-gray-200 p-6">Address</th>
                    <th className="border-b border-gray-200 p-6">Phone</th>
                    <th className="border-b border-gray-200 p-6">Total Price</th>
                    <th className="border-b border-gray-200 p-6">Bank Name</th>
                    <th className="border-b border-gray-200 p-6">Remaining Time</th>
                    <th className="border-b border-gray-200 p-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmedOrders.map((order) => (
                    <React.Fragment key={order.orderId}>
                      <tr className="hover:bg-blue-50 text-gray-700 text-sm">
                        <td className="border-b border-gray-200 p-6">{order.orderId}</td>
                        <td className="border-b border-gray-200 p-6">{order.customerEmail}</td>
                        <td className="border-b border-gray-200 p-6">{order.bookTitle}</td>
                        <td className="border-b border-gray-200 p-6">{order.customerName}</td>
                        <td className="border-b border-gray-200 p-6">{order.customerAddress}</td>
                        <td className="border-b border-gray-200 p-6">{order.customerPhone}</td>
                        <td className="border-b border-gray-200 p-6 font-semibold text-blue-600">${order.totalPrice.toFixed(2)}</td>
                        <td className="border-b border-gray-200 p-6">{order.bankName}</td>
                        <td className="border-b border-gray-200 p-6">{calculateRemainingTime(order.confirmationDate)}</td>
                        <td className="border-b border-gray-200 p-6">
                          <button
                            onClick={() => handleDeleteOrder(order.orderId)}
                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="9" className="border-b border-gray-200 p-6">
                          <div className="flex flex-col items-start space-y-2">
                            <input
                              type="text"
                              placeholder="Type your message..."
                              value={messages[order.orderId] || ''}
                              onChange={(e) => setMessages({ ...messages, [order.orderId]: e.target.value })}
                              className="w-full p-2 border border-gray-300 rounded-md"
                            />
                            <button
                              onClick={() => handleSendMessage(order.orderId)}
                              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                            >
                              Send
                            </button>
                          </div>
                        </td>
                      </tr>
                    </React.Fragment>
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
