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
    return <div className="text-center text-gray-700 py-20 text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-20 text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-600 to-cyan-400 py-32 h-screen">
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover brightness-50"
            src="src/videos/garbage.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Background Video"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>

        <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-full text-center space-y-6">
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Welcome To EcoBin
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl text-gray-100 drop-shadow-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Turning waste into wonders, one step at a time.
          </motion.p>
          <motion.button
            onClick={openModal}
            className="flex items-center bg-green-500 hover:bg-green-600 text-white py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-110 transition duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaRecycle className="inline mr-2 text-2xl" /> Explore Our Creations
          </motion.button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-white" id="introduction">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-600 mb-8">How EcoBin Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[{ icon: FaRecycle, title: "Collect", text: "We collect recyclable waste from your doorstep." },
              { icon: FaLightbulb, title: "Process", text: "We turn waste into reusable materials and products." },
              { icon: FaTruck, title: "Deliver", text: "Eco-friendly items are delivered to your home." }]
              .map((step, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gray-100 p-8 rounded-xl shadow-lg"
                  whileHover={{ y: -10 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                >
                  <step.icon className="text-4xl text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.text}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* EcoBin Resources Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-600 mb-8">EcoBin Products</h2>
          <p className="text-lg text-gray-700 mb-12 max-w-2xl mx-auto">
            Discover unique, sustainable creations made from recycled materials.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {resources.length > 0 ? (
              resources.map((resource, index) => (
                <motion.div
                  key={resource._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden p-5 border hover:shadow-xl transition"
                  whileHover={{ scale: 1.03 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={`http://localhost:3000/uploads/${resource.image}`}
                    alt={resource.name}
                    className="h-48 w-full object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-bold text-green-700">{resource.name}</h3>
                  <p className="text-gray-600 text-sm mt-2 mb-4">{resource.discription}</p>
                  <div className="text-lg font-semibold text-green-600 mb-4">
                    Rs. {resource.price}
                  </div>
                  <Link
                    to="/itemPayment"
                    onClick={() => {
                      localStorage.setItem("selectedProduct", JSON.stringify({
                        name: resource.name,
                        price: resource.price,
                        id: resource._id,
                      }));
                    }}
                    className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium transition"
                  >
                    Order Now
                  </Link>
                </motion.div>
              ))
            ) : (
              <p className="col-span-3 text-gray-500">No resources available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Modal for Get Started */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-teal-500 to-cyan-400 rounded-xl p-8 w-11/12 max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">Get Started</h2>
              <button onClick={closeModal} className="text-2xl text-white">&times;</button>
            </div>
            <p className="text-white text-lg mb-6">
              {currentStep === 1 && "Welcome to EcoBin! This guide will help you get started with our eco-friendly waste management services."}
              {currentStep === 2 && "Register and sign in to schedule waste pickups from the Services tab."}
              {currentStep === 3 && "Explore our homepage for tips and recycled products."}
              {currentStep === 4 && "You're all set! Enjoy the EcoBin experience and join the recycling revolution."}
            </p>
            <div className="text-center">
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="bg-white text-green-700 font-bold px-6 py-2 rounded-full hover:bg-green-100 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={finishGuide}
                  className="bg-white text-green-700 font-bold px-6 py-2 rounded-full hover:bg-green-100 transition"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
