import React, { useState, useEffect, useRef } from 'react';
import { Button, Container, Row, Col, Card, ProgressBar, Spinner, Alert } from 'react-bootstrap';
import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';

const Scanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [error, setError] = useState(null);
  const [model, setModel] = useState(null);
  const imgRef = useRef(null);

  // Load the TensorFlow.js model when component mounts
  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        console.log('TensorFlow.js is ready');
        const loadedModel = await mobilenet.load();
        setModel(loadedModel);
        console.log('Model loaded successfully');
      } catch (err) {
        console.error('Failed to load model:', err);
        setError('Failed to initialize the AI model. Please refresh the page.');
      }
    };

    loadModel();

    // Cleanup function
    return () => {
      if (model) {
        console.log('Component unmounted');
      }
    };
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file (JPEG, PNG, etc.)');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setAnalysisResults(null);
      setError(null);
    }
  };

  const processPredictions = (predictions) => {
    const WASTE_CATEGORIES = {
      plastic: ['bottle', 'container', 'bag', 'plastic', 'wrapper', 'packaging'],
      metal: ['can', 'metal', 'aluminum', 'tin', 'foil'],
      paper: ['paper', 'cardboard', 'newspaper', 'box', 'carton'],
      glass: ['glass', 'bottle', 'jar'],
      organic: ['food', 'fruit', 'vegetable', 'organic', 'compost', 'peel']
    };

    const composition = {
      plastic: 0,
      metal: 0,
      paper: 0,
      glass: 0,
      organic: 0
    };

    predictions.forEach(prediction => {
      const labelText = prediction.className.toLowerCase();
      for (const [category, keywords] of Object.entries(WASTE_CATEGORIES)) {
        if (keywords.some(keyword => labelText.includes(keyword))) {
          composition[category] += prediction.probability;
        }
      }
    });

    const total = Object.values(composition).reduce((sum, val) => sum + val, 0);
    const percentages = {};
    
    if (total > 0) {
      for (const [category, value] of Object.entries(composition)) {
        percentages[category] = Math.round((value / total) * 100);
      }
    } else {
      for (const category of Object.keys(composition)) {
        percentages[category] = 20;
      }
    }

    return percentages;
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      setError('Please select an image first');
      return;
    }

    if (!model) {
      setError('AI model is still loading. Please wait...');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    
    try {
      if (!imgRef.current) {
        throw new Error('Image element not found');
      }

      const predictions = await model.classify(imgRef.current);
      console.log('Predictions:', predictions);
      
      const wasteResults = processPredictions(predictions);
      setAnalysisResults(wasteResults);
    } catch (err) {
      console.error('Analysis error:', err);
      setError(`Analysis failed: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Waste Composition Scanner
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Upload an image of waste to analyze its material composition
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Waste Image</h2>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <label
                        htmlFor="imageUpload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="imageUpload"
                          name="imageUpload"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              {previewImage && (
                <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                  <img
                    ref={imgRef}
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-contain"
                    crossOrigin="anonymous"
                    onLoad={() => console.log('Image loaded')}
                  />
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={analyzeImage}
                  disabled={isAnalyzing || !selectedImage || !model}
                  className={`inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${(isAnalyzing || !selectedImage || !model) ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    'Scan Now'
                  )}
                </button>
              </div>

              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <div className="mt-2 text-sm text-red-700">
                        <p>{error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {analysisResults && (
            <div className="bg-gray-50 px-6 py-8 sm:p-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
              <p className="text-gray-600 mb-6">Composition of waste materials detected in your image:</p>
              
              <div className="space-y-6">
                {Object.entries(analysisResults).map(([material, percentage]) => (
                  <div key={material} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700 capitalize">{material}</span>
                      <span className="text-sm font-semibold text-gray-900">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${getColorForMaterial(material)}`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-5 gap-4">
                {Object.entries(analysisResults).map(([material, percentage]) => (
                  <div key={material} className="text-center">
                    <div className={`h-3 w-3 rounded-full ${getColorForMaterial(material, true)} mx-auto mb-1`}></div>
                    <span className="text-xs font-medium text-gray-500 capitalize">{material} ({percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getColorForMaterial = (material, dark = false) => {
  switch(material) {
    case 'plastic': return dark ? 'bg-blue-600' : 'bg-blue-500';
    case 'metal': return dark ? 'bg-yellow-600' : 'bg-yellow-500';
    case 'paper': return dark ? 'bg-indigo-600' : 'bg-indigo-500';
    case 'glass': return dark ? 'bg-green-600' : 'bg-green-500';
    case 'organic': return dark ? 'bg-gray-800' : 'bg-gray-700';
    default: return dark ? 'bg-purple-600' : 'bg-purple-500';
  }
};

export default Scanner;