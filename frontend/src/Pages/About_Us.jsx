import React, { useState } from "react";
import { FaBook, FaRegBookmark, FaUserFriends } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-teal-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Our Bookstore</h1>
          <p className="text-lg mb-6">
            We are a bookstore committed to providing an extensive selection of books, fostering a love for reading, and promoting lifelong learning. Whether you're looking for the latest bestsellers, classic literature, or specialized educational materials, we have something for everyone.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            At [Book Haven], we are passionate about fostering a love for reading and promoting lifelong learning. We believe in the power of books to educate, inspire, and entertain, and we strive to create an inviting space for readers of all ages.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            Our mission is to provide a wide range of books that cater to diverse interests, from bestsellers to rare finds. We aim to connect readers with the stories and knowledge they seek, creating an enriching experience that encourages curiosity and exploration.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            We partner with authors, publishers, and local communities to host events, promote literacy, and support the literary world. Join us on our journey to inspire minds, one book at a time.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-teal-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-teal-600 mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1: Book Sales */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaBook className="text-teal-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl text-gray-800 font-semibold mb-2">Book Sales</h3>
              <p className="text-gray-600">
                We offer a wide selection of books across various genres, including fiction, non-fiction, educational materials, and more.
              </p>
            </div>

            {/* Service 2: Book Recommendations */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaRegBookmark className="text-teal-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl text-gray-800 font-semibold mb-2">Book Recommendations</h3>
              <p className="text-gray-600">
                Our expert staff will help you find the perfect book based on your interests and preferences.
              </p>
            </div>

            {/* Service 3: Book Events */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FaUserFriends className="text-teal-500 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl text-gray-800 font-semibold mb-2">Book Events</h3>
              <p className="text-gray-600">
                Join us for author readings, book signings, and community events to engage with fellow book lovers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Certifications Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-teal-600 mb-8">Our Certifications</h2>
          <p className="text-lg text-gray-700 mb-8">
            We are proud to hold various certifications that demonstrate our commitment to sustainability and ethical business practices.
          </p>
          <div className="flex justify-center space-x-12 flex-wrap">
            {/* Certification 1 */}
            <div
              className="flex flex-col items-center mb-8 cursor-pointer"
              onClick={() => openModal('src/images/Certificate.png')}
            >
              <img
                src="src/images/Certificate.png"
                alt="ISO Certification"
                className="mb-4 w-32 h-32"
              />
              <span className="text-lg font-semibold text-gray-800">2022 Book Camping</span>
            </div>

            {/* Certification 2 */}
            <div
              className="flex flex-col items-center mb-8 cursor-pointer"
              onClick={() => openModal('src/images/Certificate1.png')}
            >
              <img
                src="src/images/Certificate1.png"
                alt="Green Seal Certification"
                className="mb-4 w-32 h-32"
              />
              <span className="text-lg font-semibold text-gray-800">2023 Faster Sales</span>
            </div>

            {/* Certification 3 */}
            <div
              className="flex flex-col items-center mb-8 cursor-pointer"
              onClick={() => openModal('src/images/Certificate2.png')}
            >
              <img
                src="src/images/Certificate2.png"
                alt="Fair Trade Certification"
                className="mb-4 w-32 h-32"
              />
              <span className="text-lg font-semibold text-gray-800">2024 Knowledge Bank</span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for displaying the large certificate */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <img
              src={currentImage}
              alt="Certificate"
              className="w-96 h-auto"
            />
            <button
              onClick={closeModal}
              className="mt-4 px-6 py-2 bg-teal-600 text-white rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
