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
        // TensorFlow.js models don't need explicit disposal in this case
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
      // If no matches found, show equal distribution
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
      // Wait for the image to load in the DOM
      if (!imgRef.current) {
        throw new Error('Image element not found');
      }

      // Classify the image
      const predictions = await model.classify(imgRef.current);
      console.log('Predictions:', predictions);
      
      // Process results for waste categories
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
    <Container className="my-5">
      <h1 className="text-center mb-4">Waste Composition Scanner</h1>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Upload Waste Image</Card.Title>
              <div className="mb-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="form-control"
                  id="imageUpload"
                />
                <div className="form-text">Upload a clear photo of waste (max 5MB)</div>
              </div>
              
              {previewImage && (
                <div className="text-center mb-4">
                  <img
                    ref={imgRef}
                    src={previewImage}
                    alt="Preview"
                    style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }}
                    className="img-fluid"
                    crossOrigin="anonymous" // Important for TensorFlow.js
                    onLoad={() => console.log('Image loaded')}
                  />
                </div>
              )}

              <div className="text-center">
                <Button
                  variant="primary"
                  onClick={analyzeImage}
                  disabled={isAnalyzing || !selectedImage || !model}
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      <span className="ms-2">Analyzing...</span>
                    </>
                  ) : (
                    'Scan Now'
                  )}
                </Button>
              </div>

              {error && (
                <Alert variant="danger" className="mt-3">
                  <Alert.Heading>Error</Alert.Heading>
                  <p>{error}</p>
                </Alert>
              )}
            </Card.Body>
          </Card>

          {analysisResults && (
            <Card className="mt-4">
              <Card.Body>
                <Card.Title>Analysis Results</Card.Title>
                <p>Composition of waste materials:</p>
                
                {Object.entries(analysisResults).map(([material, percentage]) => (
                  <div key={material} className="mb-3">
                    <div className="d-flex justify-content-between mb-1">
                      <span className="text-capitalize fw-bold">{material}</span>
                      <span className="fw-bold">{percentage}%</span>
                    </div>
                    <ProgressBar 
                      now={percentage} 
                      label={`${percentage}%`} 
                      variant={getVariantForMaterial(material)}
                      animated 
                    />
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const getVariantForMaterial = (material) => {
  switch(material) {
    case 'plastic': return 'primary';
    case 'metal': return 'warning';
    case 'paper': return 'info';
    case 'glass': return 'success';
    case 'organic': return 'dark';
    default: return 'secondary';
  }
};

export default Scanner;