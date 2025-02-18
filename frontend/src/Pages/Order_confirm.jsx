import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Order_confirm() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from the database
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/orders/list');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Handle delete order
  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/orders/${orderId}`);
      if (response.status === 200) {
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        alert('Order deleted successfully!');
      } else {
        alert('Failed to delete the order.');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete the order. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Order Confirmation</h1>
      {orders.length > 0 ? (
        <div className="w-full max-w-7xl overflow-x-auto p-6 bg-white shadow-md rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-800 uppercase text-sm leading-normal">
                <th className="border-b border-gray-200 p-4">Customer Email</th>
                <th className="border-b border-gray-200 p-4">Book Title</th>
                <th className="border-b border-gray-200 p-4">Customer Name</th>
                <th className="border-b border-gray-200 p-4">Address</th>
                <th className="border-b border-gray-200 p-4">Phone</th>
                <th className="border-b border-gray-200 p-4">Total Price</th>
                <th className="border-b border-gray-200 p-4">Quantity</th>
                <th className="border-b border-gray-200 p-4">Bank Name</th>
                <th className="border-b border-gray-200 p-4">Payment Date</th>
                <th className="border-b border-gray-200 p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50 text-gray-700 text-sm">
                  <td className="border-b border-gray-200 p-4">{order.customerEmail}</td>
                  <td className="border-b border-gray-200 p-4">{order.bookTitle}</td>
                  <td className="border-b border-gray-200 p-4">{order.customerName}</td>
                  <td className="border-b border-gray-200 p-4">{order.customerAddress}</td>
                  <td className="border-b border-gray-200 p-4">{order.customerPhone}</td>
                  <td className="border-b border-gray-200 p-4 font-semibold">${order.totalPrice.toFixed(2)}</td>
                  <td className="border-b border-gray-200 p-4">{order.quantity}</td>
                  <td className="border-b border-gray-200 p-4">{order.bankName}</td>
                  <td className="border-b border-gray-200 p-4">
                    {new Date(order.paymentDate).toLocaleDateString()}
                  </td>
                  <td className="border-b border-gray-200 p-4">
                    <button
                      onClick={() => handleDeleteOrder(order._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      Delete
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
  );
}
