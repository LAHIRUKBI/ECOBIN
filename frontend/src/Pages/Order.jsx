import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaUserPlus, FaUsers, FaClipboardList } from "react-icons/fa";

export default function Order() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/payment");
        setPayments(response.data.data);
      } catch (err) {
        setError("Error fetching payment details");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleDeletePayment = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/payment/${id}`);
      if (response.status === 200) {
        setPayments((prev) => prev.filter((payment) => payment._id !== id));
        alert("Payment deleted successfully!");
      } else {
        alert("Failed to delete the payment.");
      }
    } catch (error) {
      console.error("Error deleting payment:", error.message);
      alert("Failed to delete the payment. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100 mt-20">
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
            <li className="flex items-center p-4 hover:bg-green-600 rounded-md transition" onClick={() => navigate("/userview")}> <FaUsers className="text-white text-lg mr-3" /> <span className="font-medium">View Users</span></li>
            <li className="flex items-center p-4 bg-green-600 rounded-md transition" onClick={() => navigate("/order")}> <FaClipboardList className="text-white text-lg mr-3" /> <span className="font-medium">View Orders</span></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">ORDERS</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {payments.map((payment) => (
            <div key={payment._id} className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{payment.bookTitle}</h2>
              <p className="text-gray-600"><strong>Book ID:</strong> {payment.bookId}</p>
              <p className="text-gray-600"><strong>Customer Name:</strong> {payment.customerName}</p>
              <p className="text-gray-600"><strong>Email:</strong> {payment.customerEmail}</p>
              <p className="text-gray-600"><strong>Address:</strong> {payment.customerAddress}</p>
              <p className="text-gray-600"><strong>Phone:</strong> {payment.customerPhone}</p>
              <p className="text-gray-600"><strong>Total Price:</strong> ${payment.totalPrice}</p>
              <p className="text-gray-600"><strong>Bank Name:</strong> {payment.bankName}</p>
              <div className="mt-4">
                <button onClick={() => handleDeletePayment(payment._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
