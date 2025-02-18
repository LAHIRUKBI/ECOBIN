import React from 'react';
import { FaBookOpen, FaLightbulb, FaBrain } from 'react-icons/fa'; // Importing icons for visual appeal

export default function Benefits_of_learning_to_read() {
  return (
    <div className="min-h-screen bg-white py-12 px-6">

      {/* Page Heading */}
      <h1 className="text-4xl font-extrabold text-center text-teal-800 mb-8">
        The Benefits of Learning to Read
      </h1>

      {/* Introduction Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <p className="text-lg text-gray-700 mb-4">
          Reading is one of the most powerful tools for personal and intellectual growth. It opens up new worlds, expands your horizons, and stimulates your mind. Whether you’re reading for leisure, education, or personal development, the benefits of learning to read are endless.
        </p>
        <p className="text-lg text-gray-700">
          By developing strong reading habits, you unlock countless opportunities to learn, grow, and understand the world around you better. Here are some of the most impactful benefits of learning to read:
        </p>
      </div>

      {/* Benefits Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold text-teal-700 mb-6 text-center">
          Why Learning to Read is Essential
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Benefit 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaBookOpen className="text-4xl text-teal-600 mb-4" />
            <h3 className="text-2xl font-semibold text-teal-700 mb-2">Improves Vocabulary</h3>
            <p className="text-lg text-gray-700">
              Regular reading introduces you to new words, phrases, and expressions. Over time, this expands your vocabulary and enhances your ability to communicate effectively.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaLightbulb className="text-4xl text-teal-600 mb-4" />
            <h3 className="text-2xl font-semibold text-teal-700 mb-2">Stimulates Mental Health</h3>
            <p className="text-lg text-gray-700">
              Reading helps stimulate cognitive functions and boosts mental health. It enhances brain activity, promotes relaxation, and even alleviates stress, making it a healthy habit for both the mind and soul.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6 text-center">
            <FaBrain className="text-4xl text-teal-600 mb-4" />
            <h3 className="text-2xl font-semibold text-teal-700 mb-2">Enhances Cognitive Skills</h3>
            <p className="text-lg text-gray-700">
              Reading exercises your brain and improves critical thinking, focus, and concentration. It allows you to process complex ideas, connect information, and understand perspectives beyond your own.
            </p>
          </div>
        </div>
      </div>

      {/* More Benefits Section */}
      <div className="max-w-4xl mx-auto text-center mb-12 px-4">
  <h2 className="text-3xl font-semibold text-teal-700 mb-8">
    More Benefits of Learning to Read
  </h2>
  <div className="space-y-6">
    <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-teal-600 text-2xl mr-4 font-bold">1</div>
      <p className="text-lg text-gray-700">
        Improves focus and concentration by helping you stay engaged.
      </p>
    </div>
    <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-teal-600 text-2xl mr-4 font-bold">2</div>
      <p className="text-lg text-gray-700">
        Increases empathy by exposing you to different characters, cultures, and viewpoints.
      </p>
    </div>
    <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-teal-600 text-2xl mr-4 font-bold">3</div>
      <p className="text-lg text-gray-700">
        Enhances creativity by sparking new ideas and fueling imagination.
      </p>
    </div>
    <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-teal-600 text-2xl mr-4 font-bold">4</div>
      <p className="text-lg text-gray-700">
        Expands knowledge and provides a deeper understanding of the world around you.
      </p>
    </div>
    <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-teal-600 text-2xl mr-4 font-bold">5</div>
      <p className="text-lg text-gray-700">
        Helps reduce stress by providing an escape into different worlds and stories.
      </p>
    </div>
    <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="text-teal-600 text-2xl mr-4 font-bold">6</div>
      <p className="text-lg text-gray-700">
        Promotes lifelong learning and curiosity, encouraging personal development throughout life.
      </p>
    </div>
  </div>
</div>


      {/* How Reading Benefits Different Areas of Life */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-semibold text-teal-700 mb-6">
          How Reading Improves Different Areas of Life
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Area 1 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">Personal Development</h3>
            <p className="text-lg text-gray-700">
              Reading allows you to explore different perspectives and philosophies. It fosters self-awareness and personal growth, helping you become the best version of yourself.
            </p>
          </div>

          {/* Area 2 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">Career Advancement</h3>
            <p className="text-lg text-gray-700">
              Reading industry-related books, articles, and research helps you stay updated with trends and knowledge, making you more competitive in your professional life.
            </p>
          </div>

          {/* Area 3 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">Better Communication Skills</h3>
            <p className="text-lg text-gray-700">
              As you read more, you develop an understanding of how different authors express ideas and articulate thoughts. This helps you express yourself clearly and persuasively.
            </p>
          </div>

          {/* Area 4 */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-teal-700 mb-4">Social Skills</h3>
            <p className="text-lg text-gray-700">
              Reading diverse stories and narratives allows you to understand different cultures, customs, and social situations, improving your social interactions and emotional intelligence.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mb-12">
        <h3 className="text-2xl font-semibold text-teal-700 mb-4">Ready to Start Your Reading Journey?</h3>
        <p className="text-lg text-gray-700 mb-4">
          No matter where you are in life, reading can make a significant impact. It's never too late to start. Begin your journey today and explore the endless possibilities that reading can offer.
        </p>
        <a
          href="https://www.goodreads.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-full text-lg shadow-xl transform hover:scale-105 transition duration-300"
        >
          Explore Books Now
        </a>
      </div>

    </div>
  );
}
