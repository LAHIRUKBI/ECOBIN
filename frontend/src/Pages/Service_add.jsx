/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaDollarSign,
  FaClock,
  FaFlag,
  FaCamera,
  FaClipboardList,
  FaLayerGroup,
} from "react-icons/fa";
import { FaHome, FaPlus, FaEye, FaCheckCircle, FaBox } from "react-icons/fa";

export default function Service_add() {
  const [formData, setFormData] = useState({
    mainCategory: "",
    type: "",
    price: "",
    introduction: "",
    image: null,
    serviceTime: "",
    priority: "",
  });

  const navigate = useNavigate();

  const staffName = localStorage.getItem("staffName");

  const [imagePreview, setImagePreview] = useState(null);


  const serviceCategories = {
    "Waste Collection Services": [
      "Residential Collection",
      "Commercial Collection",
      "Bulk Waste Pickup",
      "Special Waste Collection",
      "Medical Waste Disposal",
      "Street & Public Space Waste Collection",
    ],
    "Recycling Services": [
      "Plastic Recycling",
      "Paper Recycling",
      "Metal Recycling",
      "Electronic Waste Recycling",
      "Glass Recycling",
      "Textile Recycling (Clothing, Fabric Waste)",
      "Used Cooking Oil Recycling",
      "Furniture Recycling",
    ],
    "Special Waste Handling": [
      "Oil & Grease Trap Cleaning",
      "Scrap Vehicle Parts and All Vehicle Raw Materials",
    ],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:3000/api/products", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Service added successfully!");
      setFormData({
        mainCategory: "",
        type: "",
        price: "",
        introduction: "",
        image: null,
        serviceTime: "",
        priority: "",
      });
      navigate("/Service_view");
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mt-20">

      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-4 border-b border-green-500 pb-4">
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <img
              src="src/images/profilelogo.png"
              alt="Profile Icon"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{staffName}</h2>
            <p className="text-gray-300 text-sm">Service Manager</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button
            onClick={() => navigate("/Service_manager_home")}
            className="flex items-center p-4 hover:bg-green-600 rounded-md transition"
          >
            <FaHome className="mr-3" /> Home
          </button>
          <button
            onClick={() => navigate("/Service_add")}
            className="flex items-center p-4 bg-green-600 rounded-md transition"
          >
            <FaPlus className="mr-3" /> Add Service
          </button>
          <button
            onClick={() => navigate("/Service_view")}
            className="flex items-center p-4 hover:bg-green-600 rounded-md transition"
          >
            <FaEye className="mr-3" /> View Services
          </button>
          <button
            onClick={() => navigate("/Service_order_confirm")}
            className="flex items-center p-4 hover:bg-green-600 rounded-md transition"
          >
            <FaCheckCircle className="mr-3" /> View Confirm Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full py-12 px-6 bg-gradient-to-br from-green-100 via-white to-green-50">
  <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-10 border border-green-200 animate-fade-in">
    <h1 className="text-5xl font-extrabold text-center text-green-800 mb-4">
      🌿 Add New Service
    </h1>
    <p className="text-center text-green-600 text-lg mb-8">
      Contribute to a greener future with <span className="font-semibold">EcoBIN</span>.
    </p>

    <form onSubmit={handleSubmit} className="space-y-6 text-green-900">
      {/* Category */}
      <div>
        <label className="font-medium flex items-center gap-2">
          <FaLayerGroup /> Service Category
        </label>
        <select
          className="w-full p-3 mt-1 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400"
          value={formData.mainCategory}
          onChange={(e) =>
            setFormData({
              ...formData,
              mainCategory: e.target.value,
              type: "",
            })
          }
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {Object.keys(serviceCategories).map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Service Type */}
      {formData.mainCategory && (
        <div>
          <label className="font-medium flex items-center gap-2">
            <FaClipboardList /> Service Type
          </label>
          <select
            className="w-full p-3 mt-1 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400"
            value={formData.type}
            onChange={(e) =>
              setFormData({ ...formData, type: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Select service type
            </option>
            {serviceCategories[formData.mainCategory].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Price Input */}
{/* Price Input */}
<div>
  <label className="font-medium">💰 Price (LKR)</label>
  <input
    type="text"  
    className="w-full mt-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400"
    value={formData.price}
    onChange={(e) => {
      const value = e.target.value;
      // Regex allows:
      // - Empty string
      // - Numbers with optional 2 decimal places
      // - Doesn't allow multiple decimal points
      if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
        setFormData({ ...formData, price: value });
      }
    }}
    onBlur={(e) => {
      // Format to 2 decimal places when field loses focus
      const value = e.target.value;
      if (value && !value.includes(".")) {
        setFormData({ ...formData, price: `${value}.00` });
      } else if (value && value.endsWith(".")) {
        setFormData({ ...formData, price: `${value}00` });
      } else if (value && value.split(".")[1]?.length === 1) {
        setFormData({ ...formData, price: `${value}0` });
      }
    }}
    required
    placeholder="0.00"
  />
</div>

        <div>
          <label className="font-medium flex items-center gap-2">
            <FaClock /> Service Time (Days)
          </label>
          <select
            className="w-full mt-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400"
            value={formData.serviceTime}
            onChange={(e) =>
              setFormData({ ...formData, serviceTime: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Select duration
            </option>
            {["1", "3", "7", "14", "30"].map((day) => (
              <option key={day} value={day}>
                {day} Days
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium flex items-center gap-2">
            <FaFlag /> Priority
          </label>
          <select
            className="w-full mt-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            required
          >
            <option value="" disabled>
              Select priority
            </option>
            {["Low", "Medium", "High"].map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Introduction */}
      <div>
        <label className="font-medium">📝 Introduction</label>
        <textarea
          className="w-full mt-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400"
          rows="4"
          placeholder="Briefly describe your service"
          value={formData.introduction}
          onChange={(e) =>
            setFormData({ ...formData, introduction: e.target.value })
          }
          required
        ></textarea>
      </div>

      {/* Upload Image */}
      {/* Upload Image */}
<div>
  <label className="font-medium flex items-center gap-2">
    <FaCamera /> Upload Image
  </label>
  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(file));
      }
    }}
    className="w-full mt-1 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-green-400"
  />

  {imagePreview && (
    <div className="mt-4">
      <p className="text-sm text-gray-500 mb-1">Preview:</p>
      <img
        src={imagePreview}
        alt="Preview"
        className="rounded-xl shadow-lg max-h-64 object-cover border border-green-300"
      />
    </div>
  )}
</div>


      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full py-3 rounded-2xl font-bold text-xl shadow-md transition-all duration-300 ease-in-out 
          ${
            Object.values(formData).some((val) => val === "" || val === null)
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        disabled={Object.values(formData).some(
          (val) => val === "" || val === null
        )}
      >
        ➕ Add Service
      </button>
    </form>
  </div>
</main>

    </div>
  );
}
