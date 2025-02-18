import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";
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



  const testimonials = [
    {
      quote:
        "An incredible selection of books! I always find something new to read. The staff is super helpful and friendly!",
      name: "Sarah Miller",
      role: "Regular Customer",
    },
    {
      quote:
        "The bookstore has a charming atmosphere. I can easily find my favorite genres, and the cozy seating area makes it a perfect spot to read!",
      name: "David Roberts",
      role: "Book Lover",
    },
    {
      quote:
        "A wonderful experience every time I visit. The recommendations are always spot on, and I love the community events!",
      name: "Emma Johnson",
      role: "Frequent Visitor",
    },
  ];




  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-teal-500 to-cyan-500 py-24 h-screen">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover brightness-75"
            src="src/videos/Home Video.mp4"
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
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg animate__animated animate__fadeInDown">
            Welcome to Our Bookstore
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 drop-shadow-md animate__animated animate__fadeInUp">
            Discover a world of stories, knowledge, and imagination.
          </p>
          <button
            onClick={openModal}
            className="flex items-center bg-teal-600 hover:bg-teal-700 text-white py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-110 transition duration-300 animate__animated animate__fadeIn animate__delay-2s"
          >
            <FaBookOpen className="inline mr-2 text-2xl" /> Browse Our Store
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
              <h2 className="text-2xl font-bold text-teal-600">Get Started</h2>
              <button
                onClick={closeModal}
                className="text-xl text-teal-600 hover:text-teal-700"
              >
                &times;
              </button>
            </div>

            {/* Step Content */}
            {currentStep === 1 && (
              <div>
                <p className="mt-4 text-lg text-gray-700">
                  Welcome to our service guide! In this guide, you will learn
                  how to get started with our platform and take full advantage
                  of our Book store services.
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <p className="mt-4 text-lg text-gray-700">
                  To begin buying books from our collection, you need to
                  register and sign in. Once registered, a "Books" tab will
                  appear in the navigation bar where you can purchase books.
                </p>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <p className="mt-4 text-lg text-gray-700">
                  On the homepage, you'll find the curated book collection in
                  the "Learning Pool" section. Additionally, there are various
                  categories and resources to explore and enjoy.
                </p>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <p className="mt-4 text-lg text-gray-700">
                  That's it! You've completed the guide. Now, you're ready to
                  explore our services. If you need help at any time, feel free
                  to revisit this guide.
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="mt-6 text-center space-x-4">
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-full text-lg"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={finishGuide}
                  className="bg-teal-600 hover:bg-teal-700 text-white py-2 px-6 rounded-full text-lg"
                >
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="relative py-24 bg-gray-50 text-gray-900">
        {/* Background Decorations */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-white opacity-50"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-300 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-300 rounded-full opacity-30 blur-3xl"></div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h2 className="text-5xl font-bold text-teal-700 mb-8 tracking-wide uppercase drop-shadow-lg">
            Learning Pool
          </h2>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Unlock the power of knowledge with our hand-picked selection of
            educational resources.
          </p>

          {/* Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "The Importance of Learning",
                image: "src/images/The Importance of Learning.jpeg",
                description:
                  "Discover the profound impact of continuous learning on personal growth, career advancement, and overall well-being.",
                link: "/importance_of_Learning",
              },
              {
                title: "Learning Makes a Person Rich",
                image: "src/images/book5.jpg",
                description:
                  "Knowledge is wealth that never depreciates. Every lesson learned and every skill gained adds value to your life and opens doors to endless opportunities.",
                link: "/learning_Makes_a_Person_Rich",
              },
              {
                title: "Benefits of Learning to Read",
                image: "src/images/book3.jpg",
                description:
                  "Reading opens doors to a world of knowledge, imagination, and endless possibilities. Discover the key benefits of learning to read.",
                link: "/benefits_of_learning_to_read",
              },
            ].map((book, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl shadow-lg bg-white p-6 border border-gray-200 transform transition-transform duration-500 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative w-full h-56 overflow-hidden rounded-xl">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-gray-900 group-hover:text-teal-600 transition duration-300">
                  {book.title}
                </h3>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  {book.description}
                </p>
                <Link
                  to={book.link}
                  className="mt-6 inline-block bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-full text-lg shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-200 text-gray-900">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl font-extrabold text-teal-700 mb-12">
      What Our Readers Are Saying
    </h2>
    <div className="flex flex-wrap justify-center gap-8">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="w-full md:w-1/3 bg-white p-8 rounded-xl shadow-xl border border-gray-200 
            hover:shadow-2xl hover:-translate-y-2 transition-transform duration-300 backdrop-blur-md"
        >
          <div className="flex justify-center mb-4 text-teal-600">
            <FaQuoteLeft className="text-4xl opacity-80" />
          </div>
          <p className="text-lg italic text-gray-800 leading-relaxed mb-4">
            "{testimonial.quote}"
          </p>
          <p className="font-semibold text-teal-700">{testimonial.name}</p>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      ))}
    </div>
  </div>
</section>



    </div>
  );
}
