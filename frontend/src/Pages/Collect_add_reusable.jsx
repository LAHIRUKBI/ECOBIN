import React, { useState } from 'react';
import axios from 'axios';

export default function Collect_add_reusable() {
  // State to hold input values
  const [formData, setFormData] = useState({
    plastic: { amount: 0, unit: 'kg' }, // Set default unit for plastic
    glass: { amount: 0, unit: 'kg' },   // Set default unit for glass
    metals: { amount: 0, unit: 'kg' },  // Set default unit for metals
    aluminum: { amount: 0, unit: 'kg' }, // Set default unit for aluminum
    electronics: { amount: 0, unit: 'units' }, // Set default unit for electronics
    textiles: { amount: 0, unit: 'units' }, // Set default unit for textiles
    wood: { amount: 0, unit: 'kg' }, // Set default unit for wood
    lightBulbs: { amount: 0, unit: 'units' }, // Set default unit for light bulbs
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value, dataset } = e.target;
  
    // Ensure that the correct category (plastic, glass, etc.) is updated
    setFormData((prevData) => ({
      ...prevData,
      [dataset.category]: {
        ...prevData[dataset.category],
        [name]: value, // Update the amount or unit
      },
    }));
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center text-green-600 mb-8">Collect Reusable Materials</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {['plastic', 'glass', 'metals', 'aluminum', 'electronics', 'textiles', 'wood', 'lightBulbs'].map((category) => (
          <div className="flex items-center justify-between" key={category}>
            <label className="text-lg font-medium">{category.charAt(0).toUpperCase() + category.slice(1)}:</label>
            <div className="flex gap-4">
              <input
                type="number"
                name="amount"
                value={formData[category].amount}
                onChange={handleInputChange}
                data-category={category}
                className="px-4 py-2 border rounded-md"
                min="0"
                required
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
        
        <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700">Add Reusable</button>
      </form>
    </div>
  );
}
