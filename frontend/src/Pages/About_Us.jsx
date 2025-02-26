import React, { useState } from "react";
import { FaRecycle, FaBook, FaRegBookmark, FaUserFriends } from "react-icons/fa";

export default function About_Us() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openModal = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="bg-green-700 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold mb-4">About Ecobin</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Transforming waste into opportunity. Ecobin is dedicated to sustainable practices, offering eco-friendly products while fostering environmental awareness.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-4xl font-bold text-green-500 mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            We are committed to reducing waste and promoting a sustainable lifestyle by repurposing discarded materials into valuable products. Join us in making a difference!
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-800 py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-green-400 mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ icon: FaBook, title: "Eco Products", desc: "Sustainable products made from recycled materials." },
              { icon: FaRegBookmark, title: "Waste Management", desc: "Helping businesses and individuals manage waste effectively." },
              { icon: FaUserFriends, title: "Community Events", desc: "Workshops and campaigns to spread environmental awareness." }].map((service, index) => (
                <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-green-600 transition-all">
                  <service.icon className="text-green-300 text-5xl mb-4 mx-auto" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-300">{service.desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-green-400 mb-8">Our Certifications</h2>
          <div className="flex justify-center space-x-8 flex-wrap">
            {["Certificate.png", "Certificate1.png", "Certificate2.png"].map((cert, index) => (
              <div key={index} className="cursor-pointer hover:scale-105 transition-all" onClick={() => openModal(`src/images/${cert}`)}>
                <img src={`src/images/${cert}`} alt="Certification" className="w-36 h-36 rounded-md shadow-lg" />
                <p className="text-lg mt-2 font-semibold">{index === 0 ? "Eco Innovator" : index === 1 ? "Sustainable Growth" : "Green Impact"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg">
            <img src={currentImage} alt="Certification" className="w-full h-auto" />
            <button onClick={closeModal} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
