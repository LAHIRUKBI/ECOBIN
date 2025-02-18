import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Add_product() {
  const [formData, setFormData] = useState({
    mainCategory: '',
    type: '',
    price: '',
    introduction: '',
    image: null,
  });

  const navigate = useNavigate();

  // Updated categories and services relevant to SmartBIN
  const serviceCategories = {
    "Waste Collection": ["Residential Collection", "Commercial Collection", "Bulk Waste Pickup", "Special Waste Collection"],
    "Recycling Services": ["Plastic Recycling", "Paper Recycling", "Metal Recycling", "Electronic Waste Recycling", "Glass Recycling"],
    "Composting": ["Organic Waste Composting", "Garden Waste Composting"],
    "Product Creation": ["Recycled Plastic Products", "Upcycled Wooden Products", "Eco-Friendly Household Goods"],
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('mainCategory', formData.mainCategory);
    data.append('type', formData.type);
    data.append('price', formData.price);
    data.append('introduction', formData.introduction);
    if (formData.image) {
      data.append('image', formData.image);
    }

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
      });

      navigate('/productview');
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleMainCategoryChange = (e) => {
    setFormData({
      ...formData,
      mainCategory: e.target.value,
      type: '',
    });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-10">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add Your Service to the Ecobin Catalog
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Fill out the form below to showcase your services in our SmartBIN system.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
            <select
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
              value={formData.mainCategory}
              onChange={handleMainCategoryChange}
              required
            >
              <option value="" disabled>Select service category</option>
              {Object.keys(serviceCategories).map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Subcategory (Type) */}
          {formData.mainCategory && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type of Service</label>
              <select
                className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                required
              >
                <option value="" disabled>Select service type</option>
                {serviceCategories[formData.mainCategory].map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
          )}

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (in $)</label>
            <input
              type="number"
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          {/* Introduction */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
            <textarea
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
              rows="4"
              placeholder="Write a brief introduction for your service."
              value={formData.introduction}
              onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Service Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full px-4 py-2 text-sm border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium text-lg shadow hover:bg-green-700 transition-all"
          >
            Add Service to Catalog
          </button>
        </form>
      </div>
    </div>
  );
}
