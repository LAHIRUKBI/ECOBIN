import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaPlus, FaEye } from 'react-icons/fa';
import axios from 'axios';

export default function Stockmanager_home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const navigate = useNavigate();

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

    fetchProducts();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-br from-blue-700 to-indigo-600 text-white shadow-xl">
        <div className="p-6 border-b border-indigo-400">
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center">
              <img
                src="src/images/profilelogo.png"
                alt="Profile Icon"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Stock Manager</h2>
              <p className="text-gray-300 text-sm">Dashboard</p>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          <ul className="space-y-4">
            <li
              className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
              onClick={() => navigate('/addbook')}
            >
              <FaPlus className="text-white text-lg mr-3" />
              <span className="font-medium">Add Product</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
              onClick={() => navigate('/productview')}
            >
              <FaEye className="text-white text-lg mr-3" />
              <span className="font-medium">View Products</span>
            </li>
            <li
              className="flex items-center p-4 hover:bg-indigo-500 rounded-md cursor-pointer transition-all"
              onClick={() => navigate('/orderconfirm')}
            >
              <FaCheckCircle className="text-white text-lg mr-3" />
              <span className="font-medium">View Confirm Orders</span>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full py-12 px-6">
        <div className="max-w-5xl w-full">
          {/* Overview Section */}
          <section className="text-center mb-16">
            <h1 className="text-4xl font-bold text-teal-600 mb-4">Welcome to the Stock Manager Dashboard</h1>
            <p className="text-lg text-gray-700">Manage your inventory, track stock levels, and add new products effortlessly.</p>
          </section>

          {/* Action Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Product Count Card */}
            <div className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-700 opacity-80"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-white py-10">
                <FaBox className="text-5xl mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Total Products</h2>
                <p className="text-3xl font-bold">{totalProducts}</p>
              </div>
            </div>

            {/* View Confirm Orders */}
            <div
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition transform duration-300"
              onClick={() => navigate('/orderconfirm')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 opacity-80"></div>
              <div className="relative z-10 flex flex-col items-center justify-center text-white py-10">
                <FaCheckCircle className="text-5xl mb-4" />
                <h2 className="text-2xl font-semibold mb-2">View Confirm Orders</h2>
                <p className="text-sm text-gray-200 text-center">Check all confirmed orders and manage order details effectively.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
