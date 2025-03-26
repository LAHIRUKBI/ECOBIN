import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaPlus, FaEye, FaHome } from 'react-icons/fa';
import axios from 'axios';

export default function Service_manager_home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [confirmedOrdersCount, setConfirmedOrdersCount] = useState(0);  // New state for confirmed orders count
  const navigate = useNavigate();

  const staffName = localStorage.getItem('staffName');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        const products = response.data.products; // Adjusted based on API response structure
        setTotalProducts(products.length);
        setOutOfStock(products.filter(product => product.stock === 0).length);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchConfirmedOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/payment'); // Same API endpoint used in Order_confirm component
        setConfirmedOrdersCount(response.data.data.length); // Set confirmed orders count
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchProducts();
    fetchConfirmedOrders();
  }, []);

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
          <button onClick={() => navigate('/Service_manager_home')} className="flex items-center p-4 bg-green-600 rounded-md transition">
            <FaHome className="mr-3" /> Home
          </button>
          <button onClick={() => navigate('/Service_add')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
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
        <div className="max-w-5xl w-full">
          {/* Overview Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold text-teal-600 mb-4">Welcome to the Service Manager Dashboard</h1>
            <p className="text-lg text-gray-700">Manage services, add services, and add updates.</p>
          </section>

          {/* Action Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Product Count Card */}
            <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-700 opacity-80"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-white py-10">
                <FaBox className="text-5xl mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Available Services</h2>
                <p className="text-3xl font-bold">{totalProducts}</p>
              </div>
            </div>

            {/* View Confirm Orders Section */}
            <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 opacity-80"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-white py-10">
                <FaCheckCircle className="text-5xl mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Customer request Orders</h2>
                <p className="text-3xl font-bold">{confirmedOrdersCount}</p> {/* Display confirmed orders count */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
