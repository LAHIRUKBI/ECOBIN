/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShippingFast, FaRegCreditCard, FaHome } from "react-icons/fa";

function ItemPayment() {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");
  const selectedProduct =
    JSON.parse(localStorage.getItem("selectedProduct")) || {};

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: userEmail || "",
  });

  const [bankData, setBankData] = useState({
    bankName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const validateForm = () => {
      return (
        formData.name.trim() !== "" &&
        formData.address.trim() !== "" &&
        formData.phone.trim() !== "" &&
        formData.email.trim() !== "" &&
        bankData.bankName.trim() !== "" &&
        bankData.cardNumber.length === 16 &&
        bankData.expiryDate.trim() !== "" &&
        bankData.cvv.length === 3
      );
    };
    setIsFormValid(validateForm());
  }, [formData, bankData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if ((name === "name" || name === "address") && /[^a-zA-Z\s]/.test(value)) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber" && (/[^0-9]/.test(value) || value.length > 16)) return;
    if (name === "cvv" && (/[^0-9]/.test(value) || value.length > 3)) return;
    setBankData({ ...bankData, [name]: value });
  };

  const handlePaymentSubmit = async () => {
    if (!isFormValid || isSubmitting) return;
    setIsSubmitting(true);
    setError(null);
    try {
      const orderData = {
        itemTitle: selectedProduct.name || "Unknown Product",
        totalPrice: selectedProduct.price || 0,
        customerName: formData.name,
        customerAddress: formData.address,
        customerPhone: formData.phone,
        customerEmail: formData.email,
        bankName: bankData.bankName,
      };

      const response = await fetch("http://localhost:3000/api/itemOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      localStorage.removeItem("selectedProduct");
      window.location.href = "/myItemOrderDetails";
    } catch (err) {
      console.error("Payment submission error:", err);
      setError(err.message || "Failed to process payment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-16 px-4 flex justify-center items-center animate-fade-in">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-4xl border border-green-300 transform transition-all duration-500 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700">
            {selectedProduct.name || "Product Checkout"}
          </h2>
          <FaRegCreditCard className="text-green-600 text-3xl animate-bounce" />
        </div>

        <p className="text-xl font-medium text-green-800 mb-6 text-center">
          Total Price: <span className="font-bold">RS {selectedProduct.price ? selectedProduct.price.toFixed(2) : "0.00"}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Information */}
          <div>
            <h3 className="text-green-600 text-lg font-semibold mb-2">Customer Information</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  const re = /^[A-Za-z\s]*$/;
                  if (re.test(e.target.value)) handleFormChange(e);
                }}
                placeholder="Full Name"
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleFormChange}
                placeholder="Address"
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  const re = /^[0-9\b]{0,10}$/;
                  if (re.test(e.target.value)) handleFormChange(e);
                }}
                placeholder="Phone Number"
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                readOnly
                className="w-full p-3 border border-green-300 bg-gray-100 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Bank Information */}
          <div>
            <h3 className="text-green-600 text-lg font-semibold mb-2">Payment Details</h3>
            <div className="space-y-4">
              <select
                name="bankName"
                value={bankData.bankName}
                onChange={handleBankChange}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Bank</option>
                <option value="BOC">Bank of Ceylon (BOC)</option>
                <option value="HNB">Hatton National Bank (HNB)</option>
                <option value="Sampath">Sampath Bank</option>
                <option value="Commercial">Commercial Bank</option>
                <option value="NDB">NDB Bank</option>
              </select>
              <input
                type="text"
                name="cardNumber"
                value={bankData.cardNumber}
                onChange={handleBankChange}
                placeholder="1234 5678 9012 3456"
                maxLength={16}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="month"
                name="expiryDate"
                value={bankData.expiryDate}
                onChange={handleBankChange}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                name="cvv"
                value={bankData.cvv}
                onChange={handleBankChange}
                placeholder="CVV"
                maxLength={3}
                className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 space-y-4 md:space-y-0">
          <button
            onClick={handlePaymentSubmit}
            disabled={!isFormValid}
            className={`w-full md:w-auto flex items-center justify-center px-6 py-3 rounded-xl shadow-lg transition-colors duration-300 ${
              isFormValid
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <FaShippingFast className="mr-2" />
            Proceed to Pay
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full md:w-auto flex items-center justify-center px-6 py-3 rounded-xl shadow-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            <FaHome className="mr-2" />
            Cancel
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center mt-6 animate-pulse">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default ItemPayment;
