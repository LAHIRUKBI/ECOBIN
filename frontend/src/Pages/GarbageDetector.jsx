import React, { useRef, useState } from 'react';
import * as tmImage from '@teachablemachine/image';

const MODEL_URL = 'https://teachablemachine.withgoogle.com/models/tKVRCDb1T/';

export default function GarbageDetector() {
  const [label, setLabel] = useState('');
  const [loading, setLoading] = useState(false);
  const imageRef = useRef(null);
  const modelRef = useRef(null);

  const loadModel = async () => {
    if (!modelRef.current) {
      const model = await tmImage.load(
        `${MODEL_URL}model.json`,
        `${MODEL_URL}metadata.json`
      );
      modelRef.current = model;
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      imageRef.current.src = reader.result;
      setLoading(true);

      await loadModel();

      const prediction = await modelRef.current.predict(imageRef.current);
      const topResult = prediction.reduce((max, current) =>
        max.probability > current.probability ? max : current
      );

      setLabel(`${topResult.className} (${(topResult.probability * 100).toFixed(2)}%)`);
      setLoading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-3xl">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-white p-3 rounded-full shadow-lg">
                  <svg
                    className="w-12 h-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-extrabold text-white mb-2">
                Smart Garbage Detection
              </h1>
              <p className="text-green-100 text-lg">
                Upload an image to identify the type of garbage
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-8">
            <div className="space-y-8">
              {/* File Upload Area */}
              <div className="flex justify-center">
                <label className="relative cursor-pointer bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-green-500 transition-all duration-300 p-8 w-full group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="mt-4 text-lg font-medium text-gray-700">
                      Click to upload or drag and drop
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </label>
              </div>

              {/* Image Preview */}
              <div className="relative">
                <img
                  ref={imageRef}
                  alt="Preview"
                  className="mx-auto max-h-80 rounded-xl shadow-lg object-contain bg-gray-50"
                />
              </div>

              {/* Detection Result */}
              <div className="text-center">
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-100" />
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce delay-200" />
                    <span className="text-gray-600 ml-3 text-lg">Analyzing image...</span>
                  </div>
                ) : (
                  label && (
                    <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-blue-50 text-green-700 shadow-md">
                      <span className="text-3xl mr-3">🗑️</span>
                      <div>
                        <span className="text-sm text-gray-500">Detected Type:</span>
                        <span className="block font-bold text-lg text-green-800">
                          {label}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 