import React, { useEffect, useState } from "react";
import {
  FaUserAlt,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBuilding,
  FaBook,
  FaTrashAlt,
} from "react-icons/fa";
import jsPDF from "jspdf";

export default function My_payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) {
      fetch(`http://localhost:3000/api/payment/payments/${email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch payments");
          }
          return res.json();
        })
        .then((data) => {
          if (data.message) {
            setError(data.message);
          } else {
            setPayments(data);
          }
          setLoading(false);
        })
        .catch(() => {
          setError("An unexpected error occurred. Please try again.");
          setLoading(false);
        });
    } else {
      setLoading(false);
      setError("No email found. Please sign in again.");
    }
  }, []);

  const generatePDF = (payment) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Payment Receipt", 105, 10, { align: "center" });
    doc.setFontSize(12);
    const content = `
      Book ID: ${payment.bookId}
      Book Title: ${payment.bookTitle}
      Payment Date: ${new Date(payment.paymentDate).toLocaleDateString()}
      Amount: $${payment.totalPrice}
      Customer Name: ${payment.customerName}
      Customer Address: ${payment.customerAddress}
      Customer Phone: ${payment.customerPhone}
      Customer Email: ${payment.customerEmail}
      Bank Name: ${payment.bankName}
    `;
    doc.text(content, 10, 30);
    doc.save(`Receipt_${payment.bookId}.pdf`);
  };

  const deletePayment = (id) => {
    fetch(`http://localhost:3000/api/payment/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPayments((prevPayments) => prevPayments.filter((payment) => payment._id !== id));
        } else {
          setError("Failed to delete the payment.");
        }
      })
      .catch(() => {
        setError("An unexpected error occurred. Please try again.");
      });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-500">Loading payments...</div>;
  }

  if (error) {
    return <div className="text-center text-xl font-semibold text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="p-10 max-w-7xl mx-auto bg-white rounded-xl shadow-xl">
      <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600">My Payments</h2>
      {payments.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No payments found.</p>
      ) : (
        <div>
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {payments.map((payment, index) => (
              <li key={index} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Book ID: {payment.bookId}</h3>
                <div className="space-y-3">
                  <p><FaBook className="inline text-indigo-500 mr-2" /> <strong>Book Title:</strong> {payment.bookTitle}</p>
                  <p><FaUserAlt className="inline text-indigo-500 mr-2" /> <strong>Customer:</strong> {payment.customerName}</p>
                  <p><FaUserAlt className="inline text-indigo-500 mr-2" /> <strong>Email:</strong> {payment.customerEmail}</p>
                  <p><FaPhoneAlt className="inline text-indigo-500 mr-2" /> <strong>Phone:</strong> {payment.customerPhone}</p>
                  <p><FaMapMarkerAlt className="inline text-indigo-500 mr-2" /> <strong>Address:</strong> {payment.customerAddress}</p>
                  <p><FaBuilding className="inline text-indigo-500 mr-2" /> <strong>Bank:</strong> {payment.bankName}</p>
                  <p><FaMoneyBillWave className="inline text-green-500 mr-2" /> <strong>Amount:</strong> ${payment.totalPrice}</p>
                </div>
                <button
                  onClick={() => generatePDF(payment)}
                  className="mt-4 bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-200 w-full"
                >
                  Download Receipt
                </button>
                <button
                  onClick={() => deletePayment(payment._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 w-full"
                >
                  <FaTrashAlt className="inline mr-2" /> Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
