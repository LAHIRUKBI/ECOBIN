import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaLeaf, FaRecycle, FaClock, FaStar, FaArrowLeft, FaSave } from "react-icons/fa";

export default function Product_update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mainCategory: "",
    type: "",
    price: "",
    introduction: "",
    serviceTime: "",
    priority: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        if (response.data.product) {
          setFormData(response.data.product);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/products/${id}`, formData);
      if (response.status === 200) {
        navigate("/Service_view");
      } else {
        setError("Failed to update product");
      }
    } catch (error) {
      setError("Error updating product");
    }
  };

  const isFormValid = () => {
    return (
      formData.price &&
      formData.introduction &&
      formData.serviceTime &&
      formData.priority
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="flex flex-col items-center">
          <FaRecycle className="text-green-500 text-4xl mb-4 animate-spin" />
          <p className="text-green-700">Loading product data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-green-100 p-3 rounded-full shadow-md mb-4">
            <FaRecycle className="text-green-600 text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-green-800 mb-2">Update Service</h2>
          <p className="text-gray-600">Edit your eco-friendly service details</p>
          <div className="w-24 h-1 bg-green-300 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 border border-green-100">
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center text-green-600 hover:text-green-800 mb-6"
          >
            <FaArrowLeft className="mr-2" /> Back to Services
          </button>

          {/* Form fields */}
          {["mainCategory", "type", "price", "introduction"].map((field) => (
            <div key={field} className="mb-6">
              <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                {field === "mainCategory" || field === "type" ? " (Read only)" : ""}
              </label>
              <input
                type={field === "price" ? "number" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className={`w-full p-3 border ${field === "mainCategory" || field === "type" ? "bg-gray-50" : "bg-white"} border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400`}
                disabled={field === "mainCategory" || field === "type"}
              />
            </div>
          ))}

          {/* Service Time */}
          <div className="mb-6">
            <label htmlFor="serviceTime" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaClock className="mr-2 text-green-500" /> Service Time
            </label>
            <select
              id="serviceTime"
              name="serviceTime"
              value={formData.serviceTime}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
            >
              <option value="" disabled>Select service time</option>
              <option value="1">1 Day</option>
              <option value="3">3 Days</option>
              <option value="7">1 Week</option>
              <option value="14">2 Weeks</option>
              <option value="30">1 Month</option>
            </select>
          </div>

          {/* Priority */}
          <div className="mb-8">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
              <FaStar className="mr-2 text-yellow-500" /> Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 focus:border-green-400"
            >
              <option value="" disabled>Select priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className={`w-full flex items-center justify-center py-3 px-6 rounded-lg font-semibold text-white shadow-md ${
              isFormValid() 
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isFormValid()}
          >
            <FaSave className="mr-2" /> Update Service
          </button>
        </form>
      </div>
    </div>
  );
}