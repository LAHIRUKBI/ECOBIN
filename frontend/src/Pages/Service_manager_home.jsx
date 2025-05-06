import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaPlus, FaEye, FaHome } from 'react-icons/fa';
import axios from 'axios';

export default function Service_manager_home() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [confirmedOrdersCount, setConfirmedOrdersCount] = useState(0);  
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
    <div className="flex min-h-screen bg-gray-100 mt-20">


      {/* Sidebar */}
      <aside className="w-72 bg-green-700 text-white shadow-lg p-6 flex flex-col">
        <div className="flex items-center space-x-4 border-b border-green-500 pb-4">
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center">
            <img src="src/images/profilelogo.png" alt="Profile Icon" className="rounded-full w-full h-full object-cover" />
          </div>
          <div>
          <h2 className="text-xl font-semibold">{staffName}</h2>
          <p className="text-gray-300 text-sm">Service Manager</p>
          </div>
        </div>
        <nav className="mt-6 flex flex-col space-y-4">
          <button onClick={() => navigate('/Service_manager_home')} className="flex items-center p-4 bg-green-600 rounded-md transition">
            <FaHome className="mr-3" /> Home
          </button>
          <button onClick={() => navigate('/Service_add')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaPlus className="mr-3" /> Add Service
          </button>
          <button onClick={() => navigate('/Service_view')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaEye className="mr-3" /> View Services
          </button>
          <button onClick={() => navigate('/Service_order_confirm')} className="flex items-center p-4 hover:bg-green-600 rounded-md transition">
            <FaCheckCircle className="mr-3" /> View Confirm Orders
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full py-16 px-6 bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
  <div className="max-w-5xl w-full space-y-12">
    {/* Overview Section */}
    <section className="text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-teal-600 mb-4 drop-shadow-md">
        Welcome to {staffName}'s Dashboard
      </h1>
      <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
        Manage services, add services, and stay updated effortlessly.
      </p>
      <div className="w-24 h-1 bg-teal-400 mx-auto mt-4 rounded-full"></div>
    </section>

    {/* Action Cards Section */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
      {/* Available Services Card */}
      <div className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-80 group-hover:opacity-90 transition-opacity"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white py-12 space-y-3">
          <FaBox className="text-5xl drop-shadow-md group-hover:animate-pulse" />
          <h2 className="text-2xl font-semibold">Available Services</h2>
          <p className="text-4xl font-bold">{totalProducts}</p>
        </div>
      </div>

      {/* Confirm Orders Card */}
      <div className="group relative bg-white rounded-3xl shadow-md hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-700 opacity-80 group-hover:opacity-90 transition-opacity"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-white py-12 space-y-3">
          <FaCheckCircle className="text-5xl drop-shadow-md group-hover:animate-pulse" />
          <h2 className="text-2xl font-semibold">Customer Request Orders</h2>
          <p className="text-4xl font-bold">{confirmedOrdersCount}</p>
        </div>
      </div>
    </div>
  </div>
</main>

    </div>
  );
}
