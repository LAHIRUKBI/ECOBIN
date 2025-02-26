import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>
          <p className="text-lg max-w-2xl mx-auto">
            We’d love to hear from you! Whether you have a question, feedback, or want to learn more about our services, get in touch with us.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-green-400">Get in Touch</h2>
          <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-300 mb-2">Your Name</label>
                  <input type="text" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-200" placeholder="Enter your name" />
                </div>
                <div>
                  <label className="block text-lg font-semibold text-gray-300 mb-2">Your Email</label>
                  <input type="email" className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-200" placeholder="Enter your email" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-300 mb-2">Your Message</label>
                <textarea className="w-full p-3 border border-gray-600 rounded-md bg-gray-700 text-gray-200" rows="6" placeholder="Type your message here"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="bg-green-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-600 transition duration-200">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-8">Our Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              icon: <FaMapMarkerAlt className="text-green-400 text-3xl" />, title: "Our Address", details: "123 Pitthugala, Malabe, Sri Lanka", onClick: () => window.open("https://maps.app.goo.gl/7YvQQZnLh9HNcbw87", "_blank")
            }, {
              icon: <FaPhoneAlt className="text-green-400 text-3xl" />, title: "Phone", details: "+94 71 -091- 0202"
            }, {
              icon: <FaEnvelope className="text-green-400 text-3xl" />, title: "Email", details: "lahiruilangasinha@gmail.com", onClick: () => window.location.href = "mailto:lahiruilangasinha@gmail.com"
            }].map((item, index) => (
              <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg flex items-center space-x-4 cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105" onClick={item.onClick}>
                {item.icon}
                <div>
                  <h3 className="text-xl text-green-400 font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}