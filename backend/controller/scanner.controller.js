// backend/controller/scanner.controller.js
import { ImageAnnotatorClient } from '@google-cloud/vision';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Initializing Google Cloud Vision client...');
console.log('Looking for credentials at:', path.join(__dirname, '../../config/google-cloud-credentials.json'));

const client = new ImageAnnotatorClient({
  keyFilename: path.join(__dirname, '../../config/google-cloud-credentials.json')
});

const WASTE_CATEGORIES = {
  plastic: ['bottle', 'container', 'bag', 'plastic', 'wrapper', 'packaging'],
  metal: ['can', 'metal', 'aluminum', 'tin', 'foil'],
  paper: ['paper', 'cardboard', 'newspaper', 'box', 'carton'],
  glass: ['glass', 'bottle', 'jar'],
  organic: ['food', 'fruit', 'vegetable', 'organic', 'compost', 'peel']
};

export const analyzeWasteImage = async (req, res) => {
  try {
    console.log('Analyze request received');
    
    if (!req.file) {
      console.log('No file provided');
      return res.status(400).json({ error: 'No image provided' });
    }

    console.log('Image received, size:', req.file.size, 'bytes');
    
    // Perform label detection
    console.log('Calling Google Cloud Vision API...');
    const [result] = await client.labelDetection(req.file.buffer);
    console.log('API call successful, results:', result);
    
    const labels = result.labelAnnotations || [];
    console.log('Detected labels:', labels.map(l => l.description));

    const composition = {
      plastic: 0,
      metal: 0,
      paper: 0,
      glass: 0,
      organic: 0
    };

    labels.forEach(label => {
      const labelText = label.description.toLowerCase();
      for (const [category, keywords] of Object.entries(WASTE_CATEGORIES)) {
        if (keywords.some(keyword => labelText.includes(keyword))) {
          composition[category] += label.score || 0.5;
          console.log(`Matched ${labelText} to ${category}`);
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
      console.log('No matches found, using fallback distribution');
      for (const category of Object.keys(composition)) {
        percentages[category] = 20;
      }
    }

    console.log('Final percentages:', percentages);
    res.json(percentages);
  } catch (error) {
    console.error('Full error analyzing image:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      details: error.details
    });
    res.status(500).json({ 
      error: 'Failed to analyze image',
      details: error.message,
      code: error.code
    });
  }
};