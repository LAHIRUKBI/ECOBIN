import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Order() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/payment');
        setPayments(response.data.data);
      } catch (err) {
        setError('Error fetching payment details');
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
        alert('Payment deleted successfully!');
      } else {
        alert('Failed to delete the payment.');
      }
    } catch (error) {
      console.error('Error deleting payment:', error.message);
      alert('Failed to delete the payment. Please try again.');
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
    <div className="container mx-auto px-4 py-10">
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
            <p className="text-gray-600"><strong>Quantity:</strong> {payment.quantity}</p>
            <p className="text-gray-600"><strong>Bank Name:</strong> {payment.bankName}</p>
            <div className="mt-4">
              <button
                onClick={() => handleDeletePayment(payment._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <p className="text-gray-600">
          You can track all payments and take necessary actions. The details are updated in real-time.
        </p>
      </div>
    </div>
  );
}
