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
  const [messages, setMessages] = useState({});

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
  };

  const handleSendMessage = (id) => {
    alert(`Message sent: ${messages[id] || "No message entered"}`);
    setMessages((prevMessages) => ({ ...prevMessages, [id]: "" }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-500">
        Loading payments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-xl font-semibold text-red-500 mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-white rounded-xl shadow-lg border border-gray-300">
      <h2 className="text-3xl font-semibold text-center mb-10 text-green-700">
        My Payments
      </h2>
      {payments.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No payments found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {payments.map((payment, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 border border-gray-200"
            >
              <h3 className="text-lg font-semibold text-green-700 mb-4">
                Book ID: {payment.bookId}
              </h3>
              <div className="space-y-3 text-gray-700">
                <p>
                  <FaBook className="inline text-green-600 mr-2" />{" "}
                  <strong>Book Title:</strong> {payment.bookTitle}
                </p>
                <p>
                  <FaUserAlt className="inline text-green-600 mr-2" />{" "}
                  <strong>Customer:</strong> {payment.customerName}
                </p>
                <p>
                  <FaUserAlt className="inline text-green-600 mr-2" />{" "}
                  <strong>Email:</strong> {payment.customerEmail}
                </p>
                <p>
                  <FaPhoneAlt className="inline text-green-600 mr-2" />{" "}
                  <strong>Phone:</strong> {payment.customerPhone}
                </p>
                <p>
                  <FaMapMarkerAlt className="inline text-green-600 mr-2" />{" "}
                  <strong>Address:</strong> {payment.customerAddress}
                </p>
                <p>
                  <FaBuilding className="inline text-green-600 mr-2" />{" "}
                  <strong>Bank:</strong> {payment.bankName}
                </p>
                <p>
                  <FaMoneyBillWave className="inline text-green-600 mr-2" />{" "}
                  <strong>Amount:</strong> ${payment.totalPrice}
                </p>
              </div>
              <div className="mt-6 space-y-4">
                <button
                  onClick={() => generatePDF(payment)}
                  className="bg-green-500 text-white px-6 py-3 rounded-lg w-full hover:bg-green-600 transition duration-200"
                >
                  Download Receipt
                </button>
                <button
                  onClick={() => deletePayment(payment._id)}
                  className="bg-red-500 text-white px-6 py-3 rounded-lg w-full hover:bg-red-600 transition duration-200"
                >
                  <FaTrashAlt className="inline mr-2" /> Delete
                </button>
                <div>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={messages[payment._id] || ""}
                    onChange={(e) =>
                      setMessages({ ...messages, [payment._id]: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <button
                    onClick={() => handleSendMessage(payment._id)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg w-full mt-3 hover:bg-blue-600 transition duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
  