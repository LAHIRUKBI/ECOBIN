/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRecycle, FaLightbulb, FaTruck, FaLeaf } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data.products);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    };
    const fetchResources = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/item");
        setResources(response.data.item);
      } catch (error) {
        setError("Error fetching resources");
      }
    };

    fetchProducts();
    fetchResources();

    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("introduction").offsetTop,
        behavior: "smooth",
      });
    }, 3000);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };
  const nextStep = () => currentStep < 4 && setCurrentStep(currentStep + 1);
  const finishGuide = () => closeModal();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading EcoBin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-xl shadow-md max-w-md mx-auto">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Content</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-0"></div>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="src/videos/garbage.mp4"
          aria-label="Background video showing recycling process"
        />
        
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-300">
                Welcome To EcoBin
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto">
              Transforming waste into sustainable solutions for a greener tomorrow
            </p>
            <motion.button
              onClick={openModal}
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-medium text-green-600 transition duration-300 ease-out rounded-full shadow-xl hover:ring-1 hover:ring-green-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-green-100"></span>
              <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-32 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-green-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
              <span className="relative flex items-center text-lg font-semibold">
                <FaRecycle className="mr-3 text-xl" />
                Explore Our Process
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white" id="introduction">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-green-600">Circular</span> Process
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
              EcoBin's innovative approach to waste management creates a sustainable cycle from collection to product
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FaRecycle, title: "Smart Collection", text: "Our AI-powered bins identify and sort recyclables at source for maximum efficiency." },
              { icon: FaLightbulb, title: "Advanced Processing", text: "State-of-the-art facilities transform waste into high-quality raw materials." },
              { icon: FaTruck, title: "Sustainable Delivery", text: "Carbon-neutral shipping brings eco-products directly to your doorstep." }
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-50 rounded-xl p-8 border border-gray-200 hover:border-green-300 transition-all duration-300"
                whileHover={{ y: -10, shadow: "lg" }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 text-green-600">
                  <step.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-center text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EcoBin Resources Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our <span className="text-green-600">Sustainable</span> Products
            </h2>
            <div className="w-20 h-1 bg-green-500 mx-auto"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
              Each purchase supports our mission to reduce waste and promote circular economy principles
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.length > 0 ? (
              resources.map((resource, index) => (
                <motion.div
                  key={resource._id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={`http://localhost:3000/uploads/${resource.image}`}
                      alt={resource.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{resource.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{resource.discription}</p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-lg font-bold text-green-600">Rs. {resource.price}</span>
                      <Link
                        to="/itemPayment"
                        onClick={() => {
                          localStorage.setItem("selectedProduct", JSON.stringify({
                            name: resource.name,
                            price: resource.price,
                            id: resource._id,
                          }));
                        }}
                        className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-full transition-colors duration-300"
                      >
                        Order Now
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 py-12 text-center">
                <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
                  <FaLeaf className="text-3xl text-green-600" />
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Products Available</h3>
                <p className="text-gray-500">We're currently refreshing our sustainable product line</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal for Get Started */}
      {isModalOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
          
          <motion.div
            className="relative bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="bg-gradient-to-r from-green-600 to-teal-500 p-6 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Welcome to EcoBin</h2>
                <button 
                  onClick={closeModal}
                  className="text-2xl hover:text-gray-200 transition"
                >
                  &times;
                </button>
              </div>
              <div className="flex mt-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-white text-green-600' : 'bg-white/30 text-white'}`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-8 h-1 ${currentStep > step ? 'bg-white' : 'bg-white/30'}`}></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6">
              <div className="min-h-40 flex items-center justify-center">
                {currentStep === 1 && (
                  <div className="text-center">
                    <FaRecycle className="text-5xl text-green-500 mx-auto mb-4" />
                    <p className="text-gray-700">
                      Discover how EcoBin transforms waste into valuable resources through our circular economy platform.
                    </p>
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="text-center">
                    <FaLightbulb className="text-5xl text-green-500 mx-auto mb-4" />
                    <p className="text-gray-700">
                      Create an account to access our full range of services and track your environmental impact.
                    </p>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="text-center">
                    <FaTruck className="text-5xl text-green-500 mx-auto mb-4" />
                    <p className="text-gray-700">
                      Schedule pickups, shop sustainable products, and join our community of eco-conscious users.
                    </p>
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="text-center">
                    <FaLeaf className="text-5xl text-green-500 mx-auto mb-4" />
                    <p className="text-gray-700">
                      You're ready to make a difference! Start your journey towards zero waste today.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-between">
                {currentStep > 1 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    Back
                  </button>
                )}
                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="ml-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={finishGuide}
                    className="ml-auto px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium transition"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}