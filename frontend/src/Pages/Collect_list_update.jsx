import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Collect_list_update() {
  const { id } = useParams();  // Get the id from the URL
  const navigate = useNavigate();

  const [reusable, setReusable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    plastic: { amount: 0, unit: '' },
    glass: { amount: 0, unit: '' },
    metals: { amount: 0, unit: '' },
    aluminum: { amount: 0, unit: '' },
    electronics: { amount: 0, unit: '' },
    textiles: { amount: 0, unit: '' },
    wood: { amount: 0, unit: '' },
    lightBulbs: { amount: 0, unit: '' },
    date: ''
  });

  useEffect(() => {
    const fetchReusable = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/reuse/list`);
        const item = response.data.find(item => item._id === id);
        if (item) {
          setReusable(item);
          setFormData(item);  // Pre-fill the form with the existing item data
        }
      } catch (error) {
        console.error('Error fetching reusable data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReusable();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [category, field] = name.split('-'); // Split to handle amount and unit separately
    setFormData(prevState => ({
      ...prevState,
      [category]: {
        ...prevState[category],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/reuse/update/${id}`, formData);
      navigate('/Collect_view_lists');  // Navigate back to the view list page after update
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-center text-3xl font-semibold text-gray-700 mb-6">Update Reusable Item</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.keys(formData).map((category) => (
          category !== 'date' && category !== '_id' && category !== '__v' && (
            <div key={category} className="space-y-4">
              <label htmlFor={`${category}-amount`} className="block text-lg font-medium text-gray-600">{category.charAt(0).toUpperCase() + category.slice(1)}</label>
              <div className="flex space-x-4">
                <input
                  type="number"
                  name={`${category}-amount`}
                  id={`${category}-amount`}
                  value={formData[category]?.amount || 0}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`Amount of ${category}`}
                />
                {/* Disable the unit input field */}
                <input
                  type="text"
                  name={`${category}-unit`}
                  id={`${category}-unit`}
                  value={formData[category]?.unit || ''}
                  onChange={handleChange} // Optionally remove this line to prevent any changes
                  className="px-4 py-2 border border-gray-300 rounded-md w-full bg-gray-200 cursor-not-allowed"
                  placeholder="Unit"
                  disabled // Disable the unit field
                />
              </div>
            </div>
          )
        ))}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
