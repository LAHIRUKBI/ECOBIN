import React, { useState, useEffect, useRef } from 'react';
import { Button, Spinner, Alert } from 'react-bootstrap';
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

  // Tailwind color variants for materials
  const getVariantForMaterial = (material) => {
    switch(material) {
      case 'plastic': return 'bg-blue-500';
      case 'metal': return 'bg-yellow-500';
      case 'paper': return 'bg-blue-300';
      case 'glass': return 'bg-green-500';
      case 'organic': return 'bg-gray-800';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Waste Composition Scanner</h1>
          <p className="text-lg text-gray-600">Upload an image to analyze waste composition</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Waste Image</h2>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG or JPG (MAX. 5MB)</p>
                    </div>
                    <input 
                      id="imageUpload" 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              {previewImage && (
                <div className="flex justify-center">
                  <div className="relative rounded-lg overflow-hidden shadow-md max-w-md">
                    <img
                      ref={imgRef}
                      src={previewImage}
                      alt="Preview"
                      className="w-full h-auto object-cover"
                      crossOrigin="anonymous"
                      onLoad={() => console.log('Image loaded')}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
                      {isAnalyzing && (
                        <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
                          <Spinner animation="border" variant="primary" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-center">
                <button
                  onClick={analyzeImage}
                  disabled={isAnalyzing || !selectedImage || !model}
                  className={`px-6 py-3 rounded-lg font-medium text-white transition-colors ${(!selectedImage || !model || isAnalyzing) ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {isAnalyzing ? (
                    <span className="flex items-center">
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-2" />
                      Analyzing...
                    </span>
                  ) : (
                    'Scan Now'
                  )}
                </button>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
            <div className="bg-gray-50 px-6 py-8 sm:px-8 border-t border-gray-200">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Analysis Results</h3>
              <p className="text-gray-600 mb-6">Composition of waste materials:</p>
              
              <div className="space-y-5">
                {Object.entries(analysisResults).map(([material, percentage]) => (
                  <div key={material} className="space-y-2">
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span className="capitalize">{material}</span>
                      <span>{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${getVariantForMaterial(material)}`} 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by TensorFlow.js and MobileNet</p>
        </div>
      </div>
    </div>
  );
};

export default Scanner;