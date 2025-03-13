import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShippingFast } from "react-icons/fa";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookTitle, totalPrice, bookId } = location.state || {};

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [bankData, setBankData] = useState({
    bankName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const employeeData = JSON.parse(userData);
      setFormData((prevState) => ({
        ...prevState,
        phone: employeeData.phone,
        email: employeeData.email,
      }));
    } else {
      console.error("No user data found in localStorage.");
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setBankData({
      ...bankData,
      [name]: value,
    });
  };

  const handlePaymentSubmit = async () => {
    setIsPopupVisible(true);
    try {
      const payload = { bookId, bookTitle, totalPrice, formData, bankData };
      const response = await fetch("http://localhost:3000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setPaymentSuccess(true);
        setIsPaymentConfirmed(true);
        setIsPopupVisible(false);
        setTimeout(() => {
          navigate("/mypayments");
        }, 2000);
      } else {
        throw new Error(data.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Payment error:", error);
    }
  };

  const isFormValid = Object.values(formData).every((value) => value) && Object.values(bankData).every((value) => value);

  if (!bookTitle) return <div className="text-center text-green-600 font-bold text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-green-50 py-16 flex justify-center items-center">
      <div className="bg-white p-10 rounded-lg shadow-lg max-w-3xl w-full border border-green-300">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-4">{bookTitle}</h2>
        <p className="text-lg text-green-800 text-center font-semibold">Total Price: RS {totalPrice.toFixed(2)}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div>
            <label className="block text-sm font-semibold text-green-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="w-full p-3 border rounded-lg focus:ring-green-500" />
            <label className="block text-sm font-semibold text-green-700 mt-3">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleFormChange} className="w-full p-3 border rounded-lg focus:ring-green-500" />
            <label className="block text-sm font-semibold text-green-700 mt-3">Phone</label>
            <input type="text" name="phone" value={formData.phone} className="w-full p-3 border rounded-lg bg-gray-100" readOnly />
            <label className="block text-sm font-semibold text-green-700 mt-3">Email</label>
            <input type="email" name="email" value={formData.email} className="w-full p-3 border rounded-lg bg-gray-100" readOnly />
          </div>

          <div>
            <label className="block text-sm font-semibold text-green-700">Select Bank</label>
            <select name="bankName" value={bankData.bankName} onChange={handleBankChange} className="w-full p-3 border rounded-lg focus:ring-green-500">
              <option value="">Select Bank</option>
              <option value="BOC">Bank of Ceylon (BOC)</option>
              <option value="HNB">Hatton National Bank (HNB)</option>
              <option value="Sampath">Sampath Bank</option>
              <option value="Commercial">Commercial Bank</option>
              <option value="NDB">NDB Bank</option>
            </select>
            <label className="block text-sm font-semibold text-green-700 mt-3">Card Number</label>
            <input type="text" name="cardNumber" value={bankData.cardNumber} onChange={handleBankChange} className="w-full p-3 border rounded-lg focus:ring-green-500" />
            <label className="block text-sm font-semibold text-green-700 mt-3">Expiry Date</label>
            <input type="month" name="expiryDate" value={bankData.expiryDate} onChange={handleBankChange} className="w-full p-3 border rounded-lg focus:ring-green-500" />
            <label className="block text-sm font-semibold text-green-700 mt-3">CVV</label>
            <input type="text" name="cvv" value={bankData.cvv} onChange={handleBankChange} className="w-full p-3 border rounded-lg focus:ring-green-500" />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button onClick={handlePaymentSubmit} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow-md flex items-center" disabled={!isFormValid}>
            <FaShippingFast className="mr-2" /> Proceed to Pay
          </button>
          <button onClick={() => navigate("/")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg shadow-md">Cancel</button>
        </div>
      </div>
    </div>
  );
}