/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa";

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
    if ((name === "name" || name === "address") && /[^a-zA-Z\s]/.test(value))
      return;
    setFormData({ ...formData, [name]: value });
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber" && (/[^0-9]/.test(value) || value.length > 16))
      return;
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

      // API call to your backend
      const response = await fetch("http://localhost:3000/api/itemOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
    <div className="min-h-screen bg-green-50 py-16 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full border border-green-300">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-4">
          {selectedProduct.name || "Product Checkout"}
        </h2>
        <p className="text-lg text-green-800 text-center font-semibold">
          Total Price: RS{" "}
          {selectedProduct.price ? selectedProduct.price.toFixed(2) : "0.00"}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-semibold text-green-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => {
                const re = /^[A-Za-z\s]*$/;
                if (re.test(e.target.value)) {
                  handleFormChange(e);
                }
              }}
              className="w-full p-3 border rounded-lg focus:ring-green-500"
              required
            />
            <label className="block text-sm font-semibold text-green-700 mt-3">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              className="w-full p-3 border rounded-lg focus:ring-green-500"
              required
            />
            <label className="block text-sm font-semibold text-green-700 mt-3">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              className="w-full p-3 border rounded-lg focus:ring-green-500"
              required
              onChange={(e) => {
                const re = /^[0-9\b]{0,10}$/;
                if (re.test(e.target.value)) {
                  handleFormChange(e);
                }
              }}
              maxLength="10"
              pattern="[0-9]{10}"
              title="Please enter exactly 10 digits."
            />
            <label className="block text-sm font-semibold text-green-700 mt-3">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              className="w-full p-3 border rounded-lg focus:ring-green-500"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-green-700">
              Select Bank
            </label>
            <select
              name="bankName"
              value={bankData.bankName}
              onChange={handleBankChange}
              className="w-full p-3 border rounded-lg focus:ring-green-500"
              required
            >
              <option value="">Select Bank</option>
              <option value="BOC">Bank of Ceylon (BOC)</option>
              <option value="HNB">Hatton National Bank (HNB)</option>
              <option value="Sampath">Sampath Bank</option>
              <option value="Commercial">Commercial Bank</option>
              <option value="NDB">NDB Bank</option>
            </select>
            <label className="block text-sm font-semibold text-green-700 mt-3">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={bankData.cardNumber}
              onChange={handleBankChange}
              className="w-full p-3 border rounded-lg focus:ring-green-500"
              placeholder="1234 5678 9012 3456"
              maxLength={16}
              required
            />
            <label className="block text-sm font-semibold text-green-700 mt-3">
              Expiry Date
            </label>
            <input
              type="month"
              name="expiryDate"
              value={bankData.expiryDate}
              onChange={handleBankChange}
              className="w-full p-3 border rounded-lg focus:ring-green-500"
              required
            />
            <label className="block text-sm font-semibold text-green-700 mt-3">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={bankData.cvv}
              onChange={handleBankChange}
              className="w-full p-3 border rounded-lg focus:ring-green-500"
              placeholder="123"
              maxLength={3}
              required
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePaymentSubmit}
            className={`px-6 py-3 rounded-lg shadow-md flex items-center ${
              isFormValid
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            <FaShippingFast className="mr-2" /> Proceed to Pay
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg shadow-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemPayment;
