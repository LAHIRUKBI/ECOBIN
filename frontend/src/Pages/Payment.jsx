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

    if ((name === "phone" || name === "cardNumber" || name === "cvv") && isNaN(value)) return;
    if (name === "phone" && value.length > 10) return;
    if (name === "cardNumber" && value.length > 16) return;
    if (name === "cvv" && value.length > 3) return;

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
      // Send the payment data to the backend
      const payload = {
        bookId,
        bookTitle,
        totalPrice,
        formData,  // customer data
        bankData,  // bank data
      };

      console.log("Sending payment data to backend:", payload); // Log request data for debugging

      const response = await fetch("http://localhost:3000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Payment Response:", data); // Log response for debugging

      if (response.ok && data.success) {
        setPaymentSuccess(true);
        setIsPaymentConfirmed(true);
        setIsPopupVisible(false);
        setTimeout(() => {
          navigate("/mypayments");  // Navigate after successful payment
        }, 2000);
      } else {
        throw new Error(data.message || "Payment failed. Please try again.");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Payment error:", error);
    }
};


  const handleConfirmPayment = async () => {
    try {
      const payload = {
        bookId,
        bookTitle,
        totalPrice,
        formData,  // customer data
        bankData,  // bank data
      };
  
      console.log("Sending payment data to backend:", payload); // Log request data for debugging
      
      const response = await fetch("http://localhost:3000/api/payment", { // Ensure this URL matches your API route
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      console.log("Payment Response:", data); // Log response for debugging
  
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

  if (!bookTitle) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white p-7 rounded-lg shadow-lg max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-teal-600 mb-4">{bookTitle}</h2>
          <p className="text-xl font-semibold mb-4">Total Price: RS {totalPrice.toFixed(2)}</p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} className="w-full p-3 border rounded-md" />
              <label className="font-semibold">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleFormChange} className="w-full p-3 border rounded-md" />
              <label className="font-semibold">Phone</label>
              <input type="text" name="phone" value={formData.phone} className="w-full p-3 border rounded-md" readOnly />
              <label className="font-semibold">Email</label>
              <input type="email" name="email" value={formData.email} className="w-full p-3 border rounded-md" readOnly />
            </div>

            <div>
              <label className="font-semibold">Select Bank</label>
              <select name="bankName" value={bankData.bankName} onChange={handleBankChange} className="w-full p-3 border rounded-md">
                <option value="">Select Bank</option>
                <option value="BOC">Bank of Ceylon (BOC)</option>
                <option value="HNB">Hatton National Bank (HNB)</option>
                <option value="Sampath">Sampath Bank</option>
                <option value="Commercial">Commercial Bank</option>
                <option value="NDB">NDB Bank</option>
              </select>
              <label className="font-semibold">Card Number</label>
              <input type="text" name="cardNumber" value={bankData.cardNumber} onChange={handleBankChange} className="w-full p-3 border rounded-md" />
              <label className="font-semibold">Expiry Date</label>
              <input type="month" name="expiryDate" value={bankData.expiryDate} onChange={handleBankChange} className="w-full p-3 border rounded-md" />
              <label className="font-semibold">CVV</label>
              <input type="text" name="cvv" value={bankData.cvv} onChange={handleBankChange} className="w-full p-3 border rounded-md" />
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button onClick={handlePaymentSubmit} className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md shadow-md" disabled={!isFormValid}>
              <FaShippingFast className="mr-2" /> Proceed to Pay
            </button>
            <button onClick={() => navigate("/")} className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-md shadow-md">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}