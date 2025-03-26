import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaRecycle, FaStar, FaClock, FaCheckCircle, FaEye, FaPlus, FaHome, FaTrash } from 'react-icons/fa';

export default function ServiceView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const staffName = localStorage.getItem('staffName');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        setProducts(response.data.products);
      } catch (error) {
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      alert("Failed to delete the product.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-green-700 to-green-500 text-white p-6 flex flex-col shadow-lg">
        <div className="flex items-center space-x-4 border-b border-green-300 pb-4">
          <img src="src/images/profilelogo.png" alt="Profile Icon" className="rounded-full w-14 h-14 object-cover" />
          <div>
            <h2 className="text-xl font-semibold">Welcome, {staffName}</h2>
            <p className="text-gray-200 text-sm">Dashboard</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button onClick={() => navigate('/Service_manager_home')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaHome className="mr-3" /> Home
          </button>
          <button onClick={() => navigate('/Service_add')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaPlus className="mr-3" /> Add Service
          </button>
          <button onClick={() => navigate('/Service_view')} className="flex items-center p-4 bg-green-600 rounded-md transition">
            <FaEye className="mr-3" /> View Services
          </button>
          <button onClick={() => navigate('/Service_order_confirm')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaCheckCircle className="mr-3" /> View Confirm Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-700">Company Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
              <p className="text-center text-red-500">{error}</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <div key={product._id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col items-center text-center">
                    {/* Main Category */}
                    <span className="bg-green-100 text-green-600 py-1 px-4 rounded-full font-semibold shadow-sm mb-2">
                      <FaRecycle className="inline-block mr-2" /> {product.mainCategory}
                    </span>

                    {/* Product Image */}
                    {product.image && (
                      <img src={`http://localhost:3000/${product.image}`} alt={product.type} className="w-70 h-40 object-cover rounded-lg mb-4" />
                    )}

                    {/* Details */}
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{product.type}</h4>
                    <p className="text-sm text-gray-600 mb-4">{product.introduction}</p>
                    
                    <div className="flex justify-around w-full text-gray-700 mb-4">
                      <span className="flex items-center font-bold text-lg text-green-700">
                         RS {product.price}
                      </span>
                      <span className="flex items-center font-semibold">
                        <FaClock className="text-green-600 mr-2" /> {product.serviceTime}
                      </span>
                      <span className="flex items-center font-semibold">
                        <FaStar className="text-green-600 mr-2" /> {product.priority}
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-between w-full space-x-2">
                      <Link to={`/Service_update/${product._id}`} className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md transition-all">
                        Update
                      </Link>
                      <button 
                        onClick={() => handleDelete(product._id)}
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
