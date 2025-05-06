import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShippingFast, FaLock, FaUserCircle, FaUniversity, FaCreditCard, FaHome, FaPhone, FaEnvelope } from "react-icons/fa";
import { GiBank } from "react-icons/gi";
import { RiVisaLine } from "react-icons/ri";
import { SiMastercard } from "react-icons/si";

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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-green-600 font-bold text-lg animate-pulse">
          Loading your payment details...
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4 flex justify-center items-center">
      <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl max-w-4xl w-full border border-green-200 space-y-8 transform transition-all duration-300 hover:shadow-2xl">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center bg-green-100 p-4 rounded-full">
            <FaShippingFast className="text-green-600 text-4xl" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-1">
            {bookTitle}
          </h2>
          <div className="flex justify-center items-center gap-2">
            <div className="bg-green-100 px-4 py-2 rounded-full">
              <p className="text-xl text-green-800 font-semibold">
                Total: Rs. {totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2 flex justify-center items-center gap-2">
            <FaLock className="text-green-500" /> 
            <span>Secure SSL encrypted payment</span>
          </p>
        </div>

        {/* Payment Steps Indicator */}
        <div className="flex justify-between items-center px-4">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">1</div>
            <span className="text-xs mt-1 text-green-600 font-medium">Details</span>
          </div>
          <div className="h-1 flex-1 bg-green-200 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold">2</div>
            <span className="text-xs mt-1 text-gray-500 font-medium">Payment</span>
          </div>
          <div className="h-1 flex-1 bg-gray-200 mx-2"></div>
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold">3</div>
            <span className="text-xs mt-1 text-gray-500 font-medium">Confirm</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <FaUserCircle className="text-green-600 text-xl" />
              </div>
              <span>Customer Information</span>
            </h3>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaUserCircle className="text-green-500 text-sm" /> Full Name
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleFormChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition duration-200" 
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaHome className="text-green-500 text-sm" /> Address
              </label>
              <input 
                type="text" 
                name="address" 
                value={formData.address} 
                onChange={handleFormChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition duration-200" 
                placeholder="123 Main St"
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaPhone className="text-green-500 text-sm" /> Phone
              </label>
              <input 
                type="text" 
                name="phone" 
                value={formData.phone} 
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed" 
                readOnly 
              />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaEnvelope className="text-green-500 text-sm" /> Email
              </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed" 
                readOnly 
              />
            </div>
          </div>

          {/* Bank Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-700 mb-4 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-full">
                <GiBank className="text-green-600 text-xl" />
              </div>
              <span>Payment Details</span>
            </h3>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaUniversity className="text-green-500 text-sm" /> Bank Name
              </label>
              <select 
                name="bankName" 
                value={bankData.bankName} 
                onChange={handleBankChange} 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition duration-200 appearance-none bg-white"
              >
                <option value="">Select your bank</option>
                <option value="BOC">Bank of Ceylon (BOC)</option>
                <option value="HNB">Hatton National Bank (HNB)</option>
                <option value="Sampath">Sampath Bank</option>
                <option value="Commercial">Commercial Bank</option>
                <option value="NDB">NDB Bank</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                <FaCreditCard className="text-green-500 text-sm" /> Card Number
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  name="cardNumber" 
                  value={bankData.cardNumber} 
                  onChange={handleBankChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition duration-200 pr-10" 
                  placeholder="1234 5678 9012 3456"
                  maxLength="16"
                />
                <div className="absolute right-3 top-3 flex gap-1">
                  <RiVisaLine className="text-blue-900 text-xl" />
                  <SiMastercard className="text-red-500 text-xl" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input 
                  type="month" 
                  name="expiryDate" 
                  value={bankData.expiryDate} 
                  onChange={handleBankChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition duration-200" 
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input 
                  type="text" 
                  name="cvv" 
                  value={bankData.cvv} 
                  onChange={handleBankChange} 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400 outline-none transition duration-200" 
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>
            
            {/* Card Preview */}
            {bankData.cardNumber && (
              <div className="mt-4 p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white shadow-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs opacity-80">Card Number</p>
                    <p className="text-lg font-mono tracking-wider">
                      •••• •••• •••• {bankData.cardNumber.slice(-4)}
                    </p>
                  </div>
                  <div className="bg-white p-1 rounded">
                    {bankData.cardNumber.startsWith('4') ? (
                      <RiVisaLine className="text-blue-900 text-2xl" />
                    ) : (
                      <SiMastercard className="text-red-500 text-2xl" />
                    )}
                  </div>
                </div>
                <div className="flex justify-between mt-6">
                  <div>
                    <p className="text-xs opacity-80">Expires</p>
                    <p className="text-sm">{bankData.expiryDate || '••/••'}</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">CVV</p>
                    <p className="text-sm">{bankData.cvv ? '•••' : '•••'}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <button
            onClick={() => navigate("/")}
            className="w-full md:w-auto bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-sm font-medium transition duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </button>

          <button
            onClick={handlePaymentSubmit}
            className={`w-full md:w-auto px-6 py-3 rounded-lg shadow-md font-medium transition duration-200 flex items-center justify-center gap-2 ${
              isFormValid 
                ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isFormValid}
          >
            <FaShippingFast /> 
            <span>Pay Rs. {totalPrice.toFixed(2)}</span>
          </button>
        </div>

        {/* Security Badges */}
        <div className="flex flex-wrap justify-center items-center gap-4 mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FaLock className="text-green-500" />
            <span>256-bit SSL Security</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span>PCI DSS Compliant</span>
          </div>
        </div>
      </div>

      {/* Payment Success Modal */}
      {isPaymentConfirmed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center animate-bounce-in">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-6">Your payment of Rs. {totalPrice.toFixed(2)} has been processed successfully.</p>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full animate-progress" style={{width: '100%'}}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}