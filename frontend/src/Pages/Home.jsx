import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRecycle } from "react-icons/fa";
import axios from "axios";
import { FaQuoteLeft } from "react-icons/fa";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  // Fetch products when the Home page is loaded
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

    fetchProducts();

    // Auto-scroll to Introduction section after 3 seconds
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById("introduction").offsetTop,
        behavior: "smooth",
      });
    }, 3000); // Adjust time as needed
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const finishGuide = () => {
    closeModal();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 to-cyan-500 py-24 h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover brightness-75"
            src="src/videos/garbage.mp4"
            autoPlay
            muted
            loop
            playsInline
            aria-label="Background Video"
          ></video>
        </div>

        {/* Overlay to Enhance Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>

        {/* Animated Hero Content */}
        <div className="relative z-10 container mx-auto flex flex-col items-center justify-center h-full text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold text-green-400 drop-shadow-lg animate__animated animate__fadeInDown">
            Welcome to EcoBin
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 drop-shadow-md animate__animated animate__fadeInUp">
            Turning waste into wonders, one step at a time.
          </p>
          <button
            onClick={openModal}
            className="flex items-center bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-full text-lg shadow-xl transform hover:scale-110 transition duration-300 animate__animated animate__fadeIn animate__delay-2s"
          >
            <FaRecycle className="inline mr-2 text-2xl" /> Explore Our Recycled Creations
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-cyan-400 rounded-full opacity-30 blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-teal-300 rounded-full opacity-30 blur-2xl animate-pulse"></div>
      </section>

      {/* Modal for Get Started */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-4/5 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-green-600">Get Started</h2>
              <button
                onClick={closeModal}
                className="text-xl text-green-600 hover:text-green-700"
              >
                &times;
              </button>
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
              <div>
                <p className="mt-4 text-lg text-gray-700">
                  Welcome to EcoBin! This guide will help you get started with our
                  platform and make the most of our eco-friendly waste management
                  services.
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <p className="mt-4 text-lg text-gray-700">
                  To begin using our waste collection services, you need to register
                  and sign in. Once registered, a "Services" tab will appear in the
                  navigation bar, allowing you to schedule waste pickups.
                </p>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <p className="mt-4 text-lg text-gray-700">
                  On the homepage, you'll find details about our recycling process and
                  how your waste contributes to sustainable products. Additionally,
                  you can explore categories like Eco Products and Recycling Tips.
                </p>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <p className="mt-4 text-lg text-gray-700">
                  That's it! You've completed the guide. Now, you're ready to explore
                  EcoBin. If you need help at any time, feel free to revisit this
                  guide.
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-6 text-center space-x-4">
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full text-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={finishGuide}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full text-lg"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* EcoBin Resources Section */}
      <section className="relative py-24 bg-gray-50 text-gray-900">
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-white opacity-50"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-300 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-lime-300 rounded-full opacity-30 blur-3xl"></div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-green-700 mb-8 tracking-wide uppercase drop-shadow-lg">
            EcoBin Resources
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Discover the power of sustainability and eco-friendly solutions through our curated educational content.
          </p>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The Importance of Recycling",
                image: "src/images/pexels-vladvictoria-2682683.jpg",
                description:
                  "Learn how recycling contributes to reducing waste, conserving natural resources, and helping the environment.",
                link: "/The Importance of Recycling",
              },
              {
                title: "Eco-Friendly Living",
                image: "src/images/Eco-Friendly Living.jpg",
                description:
                  "Explore the numerous benefits of adopting an eco-friendly lifestyle and how small changes can make a big impact.",
                link: "/eco_friendly_living",
              },
              {
                title: "Upcycling: Turning Waste Into Wealth",
                image: "src/images/Upcycling Turning Waste Into Wealth.jpg",
                description:
                  "Discover the art of upcycling and how it can help transform waste materials into valuable, creative products.",
                link: "/upcycling_waste",
              },
            ].map((resource, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-lg bg-white p-6 border border-gray-200 transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative w-full h-56 overflow-hidden rounded-xl">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-gray-900 group-hover:text-green-600 transition duration-300">
                  {resource.title}
                </h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  {resource.description}
                </p>
                <Link
                  to={resource.link}
                  className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-full text-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
