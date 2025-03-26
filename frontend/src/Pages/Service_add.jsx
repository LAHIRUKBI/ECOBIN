import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaClock, FaFlag, FaCamera, FaClipboardList, FaLayerGroup } from 'react-icons/fa';
import { FaHome, FaPlus, FaEye, FaCheckCircle, FaBox } from 'react-icons/fa';

export default function Service_add() {
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

  const staffName = localStorage.getItem('staffName');

  const serviceCategories = {
    "Waste Collection Services": ["Residential Collection", "Commercial Collection", "Bulk Waste Pickup", "Special Waste Collection","Medical Waste Disposal","Street & Public Space Waste Collection"],
    "Recycling Services": ["Plastic Recycling", "Paper Recycling", "Metal Recycling", "Electronic Waste Recycling", "Glass Recycling","Textile Recycling (Clothing, Fabric Waste)","Used Cooking Oil Recycling","Furniture Recycling"],
    "Special Waste Handling": ["Oil & Grease Trap Cleaning", "Scrap Vehicle Parts and All Vehicle Raw Materials"],
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
      navigate('/Service_view');
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-4 border-b border-green-500 pb-4">
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <img src="src/images/profilelogo.png" alt="Profile Icon" className="rounded-full w-full h-full object-cover" />
          </div>
          <div>
          <h2 className="text-xl font-semibold">Welcome, {staffName}</h2>
            <p className="text-gray-300 text-sm">Dashboard</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button onClick={() => navigate('/Service_manager_home')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaHome className="mr-3" /> Home
          </button>
          <button onClick={() => navigate('/Service_add')} className="flex items-center p-4 bg-green-600 rounded-md transition">
            <FaPlus className="mr-3" /> Add Product
          </button>
          <button onClick={() => navigate('/Service_view')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaEye className="mr-3" /> View Products
          </button>
          <button onClick={() => navigate('/Service_order_confirm')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaCheckCircle className="mr-3" /> View Confirm Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full py-12 px-6">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 border border-green-400">
          <h1 className="text-4xl font-bold text-center text-green-900 mb-6">Add New Service</h1>
          <p className="text-center text-green-700 mb-6">Contribute to a greener future with EcoBIN.</p>

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

            <button 
  type="submit" 
  className={`w-full py-3 rounded-lg font-bold text-lg shadow-lg transition-all 
    ${Object.values(formData).some(val => val === '' || val === null) ? 
    'bg-gray-400 cursor-not-allowed' : 'bg-green-700 text-white hover:bg-green-800'}`}
  disabled={Object.values(formData).some(val => val === '' || val === null)}
>
  Add Service
</button>

          </form>
        </div>
      </main>
    </div>
  );
}
