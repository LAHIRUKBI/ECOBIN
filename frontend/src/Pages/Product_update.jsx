import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

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
        navigate("/productview");
      } else {
        setError("Failed to update product");
      }
    } catch (error) {
      setError("Error updating product");
    }
  };

  if (loading) {
    return <div>Loading product data...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-bold text-center text-teal-600 mb-12">Update Product</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit}>
        {["mainCategory", "type", "price", "introduction"].map((field) => (
          <div key={field} className="mb-4">
            <label htmlFor={field} className="block text-sm font-semibold text-gray-700">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === "price" ? "number" : "text"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        ))}

        {/* serviceTime (selectable) */}
        <div className="mb-4">
          <label htmlFor="serviceTime" className="block text-sm font-semibold text-gray-700">
            Service Time
          </label>
          <select
            id="serviceTime"
            name="serviceTime"
            value={formData.serviceTime}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>Select service time</option>
            <option value="1">1 Day</option>
            <option value="3">3 Days</option>
            <option value="7">1 Week</option>
            <option value="14">2 Weeks</option>
            <option value="30">1 Month</option>
          </select>
        </div>

        {/* priority (selectable) */}
        <div className="mb-4">
          <label htmlFor="priority" className="block text-sm font-semibold text-gray-700">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>Select priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-6 rounded-lg font-semibold"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
