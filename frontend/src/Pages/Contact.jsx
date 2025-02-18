import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <section className="bg-teal-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-lg mb-6">
            We’d love to hear from you! Whether you have a question, feedback, or want to learn more about our services, get in touch with us.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-teal-600">Get in Touch</h2>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name Field */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-2">Your Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-md"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-lg font-semibold text-gray-800 mb-2">Your Email</label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-md shadow-md"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-800 mb-2">Your Message</label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-md shadow-md"
                  rows="6"
                  placeholder="Type your message here"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-teal-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-teal-600 transition duration-200 shadow-md"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-teal-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-teal-600 mb-8">Our Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Address */}
            <div className="bg-white p-6 rounded-lg shadow-2xl flex items-center space-x-4 cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105" onClick={() => window.open("https://maps.app.goo.gl/7YvQQZnLh9HNcbw87", "_blank")}>
              <FaMapMarkerAlt className="text-teal-500 text-3xl" />
              <div>
                <h3 className="text-xl text-teal-600 font-semibold mb-4">Our Address</h3>
                <p className="text-gray-700">
                  123 Pitthugala, <br />
                  Malabe, Sri Lanka
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white p-6 rounded-lg shadow-2xl flex items-center space-x-4 cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
              <FaPhoneAlt className="text-teal-500 text-3xl" />
              <div>
                <h3 className="text-xl text-teal-600 font-semibold mb-4">Phone</h3>
                <p className="text-gray-700">+94 71 -091- 0202</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white p-6 rounded-lg shadow-2xl flex items-center space-x-4 cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105" onClick={() => window.location.href = "mailto:lahiruilangasinha@gmail.com"}>
              <FaEnvelope className="text-teal-500 text-3xl" />
              <div>
                <h3 className="text-xl text-teal-600 font-semibold mb-4">Email</h3>
                <p className="text-gray-700">lahiruilangasinha@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
