import React, { useState } from "react";
import { FaBookOpen, FaSearch } from "react-icons/fa";
import {
  FaBrain,
  FaBriefcase,
  FaLightbulb,
  FaSyncAlt,
  FaUserPlus,
} from "react-icons/fa";
import { FaBook, FaLaptop, FaUsers, FaClipboardList } from "react-icons/fa";

export default function Importance_of_Learning() {
  const [showSections, setShowSections] = useState(false);
  const handleExploreMoreClick = () => {
    setShowSections(!showSections);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-8">
      {/* Description Section */}
      <div className="max-w-3xl mx-auto text-center mb-16 px-6">
      <h2 className="text-4xl font-extrabold text-center text-teal-800 mb-8">
          The Power of Continuous Learning
        </h2>
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Learning is a transformative journey that shapes our intellect, emotions, and social interactions. 
          It allows us to stay informed, adapt to challenges, and contribute meaningfully to our communities and the world.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          Through reading, exploring new topics, and acquiring skills, we unlock endless possibilities. 
          Books, in particular, offer a gateway to vast knowledge, broadening our perspectives, 
          sparking creativity, and encouraging problem-solving—building better futures for ourselves and others.
        </p>
        <div className="mt-8">
          <button
            className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-full text-lg font-medium shadow-md transform hover:scale-105 transition duration-300"
            onClick={handleExploreMoreClick} // On click, toggle the visibility of the sections
          >
            Explore More
          </button>
        </div>
      </div>

      {/* Conditional rendering of sections based on state */}
      {showSections && (
        <>
          {/* Image Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto mb-16 px-4">
            <div className="relative overflow-hidden rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-xl">
              <img
                src="src/images/book4.jpg"
                alt="Reading Books"
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-25"></div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-xl">
              <img
                src="src/images/book5.jpg"
                alt="Learning Concepts"
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-25"></div>
            </div>
          </div>

          {/* Benefits of Learning */}
          <div className="max-w-7xl mx-auto text-center mb-16 px-4">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8">
              The Benefits of Learning
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center mb-4">
                  <FaBrain className="text-blue-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Improves Mental Health
                </h3>
                <p className="text-gray-700">
                  Learning stimulates cognitive functions and helps reduce stress and anxiety.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center mb-4">
                  <FaBriefcase className="text-green-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Career Growth
                </h3>
                <p className="text-gray-700">
                  Continuous learning opens doors to better job opportunities and career advancement.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center mb-4">
                  <FaLightbulb className="text-yellow-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Enhances Problem-Solving
                </h3>
                <p className="text-gray-700">
                  Learning sharpens critical thinking, making it easier to solve complex problems.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center mb-4">
                  <FaSyncAlt className="text-purple-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Adapts to Change
                </h3>
                <p className="text-gray-700">
                  Learning new skills helps you adapt to evolving technologies and environments.
                </p>
              </div>
            </div>
          </div>

          {/* How to Incorporate Learning Into Your Life */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-semibold text-gray-800 mb-8">
              How to Incorporate Learning into Your Life
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Incorporating learning into your daily life doesn’t have to be
              overwhelming. Here are some simple ways:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12">
              {/* Card 1 */}
              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center mb-4">
                  <FaBook className="text-blue-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Read Regularly
                </h3>
                <p className="text-gray-700">
                  Set aside time each day for reading, whether it’s books, articles,
                  or news. It’s a great way to broaden your knowledge.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center mb-4">
                  <FaLaptop className="text-green-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Take Online Courses
                </h3>
                <p className="text-gray-700">
                  Take online courses or attend webinars to learn new skills.
                  Digital learning makes it easy to gain new expertise.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center mb-4">
                  <FaUsers className="text-yellow-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Engage in Discussions
                </h3>
                <p className="text-gray-700">
                  Engage in discussions with others to gain new insights and
                  perspectives. Collaboration helps expand your knowledge.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="flex items-center justify-center mb-4">
                  <FaClipboardList className="text-purple-600 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Seek New Challenges
                </h3>
                <p className="text-gray-700">
                  Practice continuous learning by seeking new challenges and
                  solutions in your personal and professional life.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
