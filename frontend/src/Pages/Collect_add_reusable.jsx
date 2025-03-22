import React, { useState } from 'react';
import axios from 'axios';
import { FaHome, FaBox, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Collect_add_reusable() {

    const navigate = useNavigate();
  // State to hold input values
  const [formData, setFormData] = useState({
    plastic: { amount: 0, unit: 'kg', available: true }, // Added "available" flag
    glass: { amount: 0, unit: 'kg', available: true },
    metals: { amount: 0, unit: 'kg', available: true },
    aluminum: { amount: 0, unit: 'kg', available: true },
    electronics: { amount: 0, unit: 'units', available: true },
    textiles: { amount: 0, unit: 'units', available: true },
    wood: { amount: 0, unit: 'kg', available: true },
    lightBulbs: { amount: 0, unit: 'units', available: true },
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;

    // If the user selects "Not available", disable the input and set amount to 0
    if (value === 'Not available') {
      setFormData((prevData) => ({
        ...prevData,
        [dataset.category]: {
          ...prevData[dataset.category],
          available: false,  // Mark as unavailable
          amount: 0 // Reset the amount
        }
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [dataset.category]: {
          ...prevData[dataset.category],
          [name]: value,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!formData.date) {
      alert('Please select a collection date.');
      return;
    }

    try {
      // Sending the data to the backend
      const response = await axios.post('http://localhost:3000/api/reuse/add', formData);
      console.log('Response from server:', response);
      alert('Data added successfully!');
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('There was an error submitting the data.');
    }
  };

  const getUnitOptions = (category) => {
    switch (category) {
      case 'plastic':
      case 'glass':
      case 'metals':
      case 'aluminum':
      case 'wood':
        return ['kg', 'g', 'lb']; // Units for materials like plastic, glass, etc.
      case 'electronics':
      case 'textiles':
      case 'lightBulbs':
        return ['units']; // Units for electronics, textiles, and lightbulbs
      default:
        return ['units'];
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
              <div className="flex items-center space-x-4 border-b border-green-500 pb-4">
                <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
                  <img src="src/images/profilelogo.png" alt="Profile Icon" className="rounded-full w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Welcome, Collect Manager</h2>
                  <p className="text-gray-300 text-sm">Dashboard</p>
                </div>
              </div>
              <nav className="mt-6 flex flex-col space-y-4">
                <button onClick={() => navigate('/collectmanagerhome')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
                  <FaHome className="mr-3" /> Home
                </button>
                <button onClick={() => navigate('/Collect_manager_orders')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
                  <FaBox className="mr-3" /> Orders
                </button>
                <button onClick={() => navigate('/Collect_add_reusable')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
                  <FaPlus  className="mr-3" /> Add Reusables
                </button>
              </nav>
            </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-center text-green-600 mb-8">Collect Reusable Materials</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {['plastic', 'glass', 'metals', 'aluminum', 'electronics', 'textiles', 'wood', 'lightBulbs'].map((category) => (
            <div className="flex items-center justify-between" key={category}>
              <label className="text-lg font-medium">{category.charAt(0).toUpperCase() + category.slice(1)}:</label>
              <div className="flex gap-4">
                <input
                  type="number"
                  name="amount"
                  value={formData[category].available ? formData[category].amount : ''}
                  onChange={handleInputChange}
                  data-category={category}
                  className="px-4 py-2 border rounded-md"
                  min="0"
                  required={formData[category].available} // Disable the input when not available
                  disabled={!formData[category].available} // Disable the input if not available
                />
                <select
                  name="unit"
                  value={formData[category].unit}
                  onChange={handleInputChange}
                  data-category={category}
                  className="px-4 py-2 border rounded-md"
                  required
                >
                  <option value="" disabled>Select unit</option>
                  {getUnitOptions(category).map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                <select
                  name="availability"
                  value={formData[category].available ? 'Available' : 'Not available'}
                  onChange={handleInputChange}
                  data-category={category}
                  className="px-4 py-2 border rounded-md"
                >
                  <option value="Available">Available</option>
                  <option value="Not available">Not available</option>
                </select>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <label className="text-lg font-medium">Collection Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="px-4 py-2 border rounded-md"
              required
            />
          </div>

          <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">
            Add Reusable
          </button>
        </form>
      </div>
    </div>
  );
}
