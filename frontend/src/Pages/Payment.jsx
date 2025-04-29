import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShippingFast, FaLock, FaUserCircle, FaUniversity } from "react-icons/fa";

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
    if ((name === "name" || name === "address") && /[^a-zA-Z\s]/.test(value)) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardNumber" && /[^0-9]/.test(value)) return;
    if (name === "cardNumber" && value.length > 16) return;
    if (name === "cvv" && /[^0-9]/.test(value)) return;
    if (name === "cvv" && value.length > 3) return;
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

  const isFormValid =
    Object.values(formData).every((value) => value) &&
    Object.values(bankData).every((value) => value) &&
    bankData.cardNumber.length === 16 &&
    bankData.cvv.length === 3;

  if (!bookTitle)
    return (
      <div className="text-center text-green-600 font-bold text-lg">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-50 py-16 px-4 flex justify-center items-center">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl max-w-4xl w-full border border-green-300 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-700 mb-2 flex justify-center items-center gap-2">
            <FaShippingFast /> {bookTitle}
          </h2>
          <p className="text-xl text-green-800 font-semibold">
            Total Price: Rs. {totalPrice.toFixed(2)}
          </p>
          <p className="text-sm text-gray-500 mt-1 flex justify-center items-center gap-1">
            <FaLock /> Your payment is 100% secure and encrypted
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Customer Info */}
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
              <FaUserCircle /> Customer Information
            </h3>
            <label className="block text-sm font-semibold text-green-700 mb-1">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
            
            <label className="block text-sm font-semibold text-green-700 mt-4 mb-1">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleFormChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
            
            <label className="block text-sm font-semibold text-green-700 mt-4 mb-1">Phone</label>
            <input type="text" name="phone" value={formData.phone} className="w-full p-3 border rounded-xl bg-gray-100 text-gray-700" readOnly />
            
            <label className="block text-sm font-semibold text-green-700 mt-4 mb-1">Email</label>
            <input type="email" name="email" value={formData.email} className="w-full p-3 border rounded-xl bg-gray-100 text-gray-700" readOnly />
          </div>

          {/* Bank Info */}
          <div>
            <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center gap-2">
              <FaUniversity /> Bank Details
            </h3>
            <label className="block text-sm font-semibold text-green-700 mb-1">Select Bank</label>
            <select name="bankName" value={bankData.bankName} onChange={handleBankChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none">
              <option value="">Choose your Bank</option>
              <option value="BOC">Bank of Ceylon (BOC)</option>
              <option value="HNB">Hatton National Bank (HNB)</option>
              <option value="Sampath">Sampath Bank</option>
              <option value="Commercial">Commercial Bank</option>
              <option value="NDB">NDB Bank</option>
            </select>

            <label className="block text-sm font-semibold text-green-700 mt-4 mb-1">Card Number</label>
            <input type="text" name="cardNumber" value={bankData.cardNumber} onChange={handleBankChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />

            <label className="block text-sm font-semibold text-green-700 mt-4 mb-1">Expiry Date</label>
            <input type="month" name="expiryDate" value={bankData.expiryDate} onChange={handleBankChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />

            <label className="block text-sm font-semibold text-green-700 mt-4 mb-1">CVV</label>
            <input type="text" name="cvv" value={bankData.cvv} onChange={handleBankChange} className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-green-400 outline-none" />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <button
            onClick={handlePaymentSubmit}
            className={`w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 font-semibold transition duration-200 ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormValid}
          >
            <FaShippingFast /> Proceed to Pay
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full md:w-auto bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-xl shadow-md font-semibold transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
