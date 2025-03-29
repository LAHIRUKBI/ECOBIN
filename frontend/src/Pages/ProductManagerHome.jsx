/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRecycle, FaStar, FaClock, FaCheckCircle, FaEye, FaPlus, FaHome, FaTrash } from 'react-icons/fa';

function ProductManagerHome() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const staffName = localStorage.getItem("staffName");
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/item");
        setItem(response.data.item);
      } catch (error) {
        setError("Error fetching items");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);
  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this Items?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/item/${itemId}`);
      setItem(item.filter((item) => item._id !== itemId));
      alert("Item deleted successfully.");  
    } catch (error) {
      alert("Failed to delete the item.");
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
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
            onClick={() => navigate("/addItem")}
            className="flex items-center p-4 hover:bg-green-600 rounded-md transition"
          >
            <FaPlus className="mr-3" /> Add Item
          </button>
          <button
            onClick={() => navigate("/ProductManagerHome")}
            className="flex items-center p-4 hover:bg-green-600 rounded-md transition"
          >
            <FaEye className="mr-3" /> View Items
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-700">
            Item Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : item.length > 0 ? (
              item.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center">
                    {item.image && (
                      <img
                      src={`http://localhost:3000/uploads/${item.image}`}
                        alt={item.name}
                        className="w-70 h-40 object-cover rounded-lg mb-4"
                      />
                    )}

                    {/* Details */}
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4" >
                      {item.discription}
                    </p>

                    <div className="flex justify-around w-full text-gray-700 mb-4">
                      <span className="flex items-center font-bold text-lg text-green-700">
                        RS {item.price}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between w-full space-x-2">
                      <Link
                        to={`/updateItem/${item._id}`}
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md transition-all"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold shadow-md transition-all flex items-center justify-center"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No products found</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductManagerHome;
