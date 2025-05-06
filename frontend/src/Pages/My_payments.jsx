import React, { useEffect, useState } from "react";
import {
  FaUserAlt,
  FaMoneyBillWave,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBuilding,
  FaBook,
  FaTrashAlt,
  FaReceipt,
  FaCalendarAlt,
  FaInfoCircle,
} from "react-icons/fa";
import jsPDF from "jspdf";

export default function My_payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");

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
    if (window.confirm("Are you sure you want to delete this payment record?")) {
      fetch(`http://localhost:3000/api/payment/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setPayments((prevPayments) =>
              prevPayments.filter((payment) => payment._id !== id)
            );
          } else {
            setError("Failed to delete the payment.");
          }
        })
        .catch(() => {
          setError("An unexpected error occurred. Please try again.");
        });
    }
  };

  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true;
    if (filter === "recent") {
      const paymentDate = new Date(payment.paymentDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return paymentDate >= thirtyDaysAgo;
    }
    return true;
  });

  const sortedPayments = [...filteredPayments].sort((a, b) => {
    if (sortBy === "date-desc") {
      return new Date(b.paymentDate) - new Date(a.paymentDate);
    } else if (sortBy === "date-asc") {
      return new Date(a.paymentDate) - new Date(b.paymentDate);
    } else if (sortBy === "amount-desc") {
      return b.totalPrice - a.totalPrice;
    } else {
      return a.totalPrice - b.totalPrice;
    }
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">Loading your payments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-md p-6 bg-white rounded-xl shadow-md text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <FaInfoCircle className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Error</h3>
          <p className="mt-2 text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-700 mb-3">
            Your Payment History
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View, download, and manage all your payment records in one place
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Payments</option>
              <option value="recent">Last 30 Days</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Amount (High to Low)</option>
              <option value="amount-asc">Amount (Low to High)</option>
            </select>
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            {payments.length} payment{payments.length !== 1 ? "s" : ""} total
          </div>
        </div>

        {sortedPayments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
              <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No payments found
            </h3>
            <p className="text-gray-500">
              {filter === "recent"
                ? "You have no payments in the last 30 days."
                : "Your payment history will appear here once you make a purchase."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sortedPayments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-2">
                        #{payment.bookId}
                      </span>
                      <h3 className="text-xl font-bold text-gray-800">
                        {payment.bookTitle}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ${payment.totalPrice}
                      </div>
                      <div className="text-xs text-gray-500">
                        <FaCalendarAlt className="inline mr-1" />
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600 mb-6">
                    <div className="flex items-start">
                      <FaUserAlt className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <div className="font-medium">{payment.customerName}</div>
                        <div className="text-xs text-gray-400">
                          {payment.customerEmail}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaBuilding className="text-green-500 mr-2 flex-shrink-0" />
                      <span>{payment.bankName}</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhoneAlt className="text-green-500 mr-2 flex-shrink-0" />
                      <span>{payment.customerPhone}</span>
                    </div>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm">{payment.customerAddress}</span>
                    </div>
                  </div>

                  <div className="flex justify-between space-x-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => generatePDF(payment)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200"
                    >
                      <FaReceipt className="mr-2" />
                      Receipt
                    </button>
                    <button
                      onClick={() => deletePayment(payment._id)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                    >
                      <FaTrashAlt className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}