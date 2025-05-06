import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaPlus, FaEye, FaHome, FaLeaf, FaRecycle } from 'react-icons/fa';
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
        const products = response.data.products;
        setTotalProducts(products.length);
        setOutOfStock(products.filter(product => product.stock === 0).length);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchConfirmedOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/payment');
        setConfirmedOrdersCount(response.data.data.length);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchProducts();
    fetchConfirmedOrders();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 mt-20">
      {/* Floating eco elements */}
      <div className="fixed top-1/4 left-1/5 animate-float">
        <FaLeaf className="text-green-200 text-xl" />
      </div>
      <div className="fixed top-1/3 right-1/4 animate-float-delay">
        <FaRecycle className="text-green-200 text-lg" />
      </div>
      <div className="fixed bottom-1/4 left-1/3 animate-float-delay-2">
        <FaLeaf className="text-green-200 text-xl rotate-45" />
      </div>

      {/* Sidebar */}
      <aside className="w-72 bg-gradient-to-b from-green-700 to-green-800 text-white shadow-xl p-6 flex flex-col fixed h-full">
        <div className="flex items-center space-x-4 border-b border-green-500 pb-4">
          <div className="bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-md">
            <img 
              src="src/images/profilelogo.png" 
              alt="Profile" 
              className="rounded-full w-full h-full object-cover border-2 border-green-300"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{staffName}</h2>
            <p className="text-green-200 text-sm">Service Manager</p>
          </div>
        </div>
        
        <nav className="mt-8 flex flex-col space-y-2">
          <button 
            onClick={() => navigate('/Service_manager_home')} 
            className="flex items-center p-3 bg-green-600 rounded-lg transition-all hover:bg-green-500 hover:translate-x-1 shadow-md"
          >
            <FaHome className="mr-3 text-green-100" /> 
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => navigate('/Service_add')} 
            className="flex items-center p-3 rounded-lg transition-all hover:bg-green-600 hover:translate-x-1"
          >
            <FaPlus className="mr-3 text-green-200" /> 
            <span>Add Service</span>
          </button>
          <button 
            onClick={() => navigate('/Service_view')} 
            className="flex items-center p-3 rounded-lg transition-all hover:bg-green-600 hover:translate-x-1"
          >
            <FaEye className="mr-3 text-green-200" /> 
            <span>View Services</span>
          </button>
          <button 
            onClick={() => navigate('/Service_order_confirm')} 
            className="flex items-center p-3 rounded-lg transition-all hover:bg-green-600 hover:translate-x-1"
          >
            <FaCheckCircle className="mr-3 text-green-200" /> 
            <span>Confirmed Orders</span>
          </button>
        </nav>

        {/* Sidebar footer */}
        <div className="mt-auto pt-4 border-t border-green-600">
          <div className="text-center text-green-300 text-sm">
            <p>EcoBin Service Portal</p>
            <p className="text-xs mt-1">v2.0.1</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 flex flex-col items-center py-12 px-8 bg-gradient-to-br from-green-50 via-white to-green-100 min-h-screen">
        <div className="max-w-6xl w-full space-y-12">
          {/* Welcome Section */}
          <section className="text-center">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 p-3 rounded-xl shadow-lg mb-4">
              <FaRecycle className="text-white text-2xl" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-green-800 mb-3">
              Welcome back, <span className="text-teal-600">{staffName}</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Here's what's happening with your services today
            </p>
            <div className="w-24 h-1.5 bg-gradient-to-r from-green-400 to-teal-400 mx-auto mt-6 rounded-full"></div>
          </section>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Available Services Card */}
            <div 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-yellow-400"
              onClick={() => navigate('/Service_view')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100 opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="relative z-10 p-8 flex items-center space-x-6 cursor-pointer">
                <div className="bg-yellow-400 p-4 rounded-xl shadow-md group-hover:animate-pulse">
                  <FaBox className="text-3xl text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Available Services</h2>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{totalProducts}</p>
                  <p className="text-sm text-gray-500 mt-1">{outOfStock} currently out of stock</p>
                </div>
              </div>
            </div>

            {/* Confirm Orders Card */}
            <div 
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 border-green-400"
              onClick={() => navigate('/Service_order_confirm')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-teal-100 opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="relative z-10 p-8 flex items-center space-x-6 cursor-pointer">
                <div className="bg-green-500 p-4 rounded-xl shadow-md group-hover:animate-pulse">
                  <FaCheckCircle className="text-3xl text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">Customer Orders</h2>
                  <p className="text-4xl font-bold text-gray-900 mt-2">{confirmedOrdersCount}</p>
                  <p className="text-sm text-gray-500 mt-1">Awaiting your confirmation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-md p-6 mt-8 border border-green-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaLeaf className="text-green-500 mr-2" /> Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button 
                onClick={() => navigate('/Service_add')}
                className="bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-lg transition-all flex items-center justify-center flex-col"
              >
                <div className="bg-green-100 p-3 rounded-full mb-2">
                  <FaPlus className="text-green-600" />
                </div>
                <span>Add New Service</span>
              </button>
              <button 
                onClick={() => navigate('/Service_view')}
                className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-lg transition-all flex items-center justify-center flex-col"
              >
                <div className="bg-blue-100 p-3 rounded-full mb-2">
                  <FaEye className="text-blue-600" />
                </div>
                <span>View Services</span>
              </button>
              <button 
                onClick={() => navigate('/Service_order_confirm')}
                className="bg-teal-50 hover:bg-teal-100 text-teal-700 p-4 rounded-lg transition-all flex items-center justify-center flex-col"
              >
                <div className="bg-teal-100 p-3 rounded-full mb-2">
                  <FaCheckCircle className="text-teal-600" />
                </div>
                <span>Manage Orders</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float 8s ease-in-out infinite 2s; }
        .animate-float-delay-2 { animation: float 8s ease-in-out infinite 4s; }
      `}</style>
    </div>
  );
}