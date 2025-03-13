import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaClock, FaFlag, FaCamera, FaClipboardList, FaLayerGroup } from 'react-icons/fa';

export default function Add_product() {
  const [formData, setFormData] = useState({
    mainCategory: '',
    type: '',
    price: '',
    introduction: '',
    image: null,
    serviceTime: '',
    priority: '',
  });

  const navigate = useNavigate();

  const serviceCategories = {
    "Waste Collection": ["Residential Collection", "Commercial Collection", "Bulk Waste Pickup", "Special Waste Collection"],
    "Recycling Services": ["Plastic Recycling", "Paper Recycling", "Metal Recycling", "Electronic Waste Recycling", "Glass Recycling"],
    "Composting": ["Organic Waste Composting", "Garden Waste Composting"],
    "Product Creation": ["Recycled Plastic Products", "Upcycled Wooden Products", "Eco-Friendly Household Goods"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      await axios.post('http://localhost:3000/api/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Service added successfully!');
      setFormData({
        mainCategory: '',
        type: '',
        price: '',
        introduction: '',
        image: null,
        serviceTime: '',
        priority: '',
      });
      navigate('/productview');
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-green-100 p-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 border border-green-400">
        <h1 className="text-4xl font-bold text-center text-green-900 mb-6">🌿 Add New Service</h1>
        <p className="text-center text-green-700 mb-6">Contribute to a greener future with SmartBIN.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-green-900 font-semibold flex items-center gap-2"><FaLayerGroup /> Service Category</label>
            <select className="w-full p-3 border rounded-lg focus:ring-green-500" value={formData.mainCategory} onChange={(e) => setFormData({ ...formData, mainCategory: e.target.value, type: '' })} required>
              <option value="" disabled>Select a category</option>
              {Object.keys(serviceCategories).map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
          {formData.mainCategory && (
            <div>
              <label className="text-green-900 font-semibold flex items-center gap-2"><FaClipboardList /> Service Type</label>
              <select className="w-full p-3 border rounded-lg focus:ring-green-500" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} required>
                <option value="" disabled>Select service type</option>
                {serviceCategories[formData.mainCategory].map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-green-900 font-semibold flex items-center gap-2"><FaDollarSign /> Price ($)</label>
              <input type="number" className="w-full p-3 border rounded-lg focus:ring-green-500" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required />
            </div>
            <div>
              <label className="text-green-900 font-semibold flex items-center gap-2"><FaClock /> Service Time (Days)</label>
              <select className="w-full p-3 border rounded-lg focus:ring-green-500" value={formData.serviceTime} onChange={(e) => setFormData({ ...formData, serviceTime: e.target.value })} required>
                <option value="" disabled>Select duration</option>
                {["1", "3", "7", "14", "30"].map((day) => (
                  <option key={day} value={day}>{day} Days</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-green-900 font-semibold flex items-center gap-2"><FaFlag /> Priority</label>
              <select className="w-full p-3 border rounded-lg focus:ring-green-500" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} required>
                <option value="" disabled>Select priority</option>
                {["Low", "Medium", "High"].map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-green-900 font-semibold">Introduction</label>
            <textarea className="w-full p-3 border rounded-lg focus:ring-green-500" rows="4" placeholder="Briefly describe your service" value={formData.introduction} onChange={(e) => setFormData({ ...formData, introduction: e.target.value })} required></textarea>
          </div>

          <div>
            <label className="text-green-900 font-semibold flex items-center gap-2"><FaCamera /> Upload Image</label>
            <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="w-full p-3 border rounded-lg focus:ring-green-500" />
          </div>

          <button type="submit" className="w-full bg-green-700 text-white py-3 rounded-lg font-bold text-lg shadow-lg hover:bg-green-800 transition-all">Add Service</button>
        </form>
      </div>
    </div>
  );
}
