import Separation from '../model/separation.model.js';

// Create new separation record
export const createSeparation = async (req, res) => {
  try {
    const { weights } = req.body;
    console.log('Received weights:', weights);

    // Calculate total weight
    const totalWeight = Object.values(weights).reduce((sum, weight) => sum + (parseFloat(weight) || 0), 0);
    console.log('Calculated total weight:', totalWeight);

    const separation = new Separation({
      weights,
      totalWeight
    });

    const savedSeparation = await separation.save();
    console.log('Saved separation:', savedSeparation);
    
    res.status(201).json({ success: true, data: savedSeparation });
  } catch (error) {
    console.error('Separation creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save separation data', 
      error: error.message 
    });
  }
};

// Get all separation records
export const getSeparations = async (req, res) => {
  try {
    const separations = await Separation.find();
    res.status(200).json({ success: true, data: separations });
  } catch (error) {
    console.error('Get separations error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get separation statistics
export const getSeparationStats = async (req, res) => {
  try {
    const separations = await Separation.find();
    
    const stats = {
      totalOrders: separations.length,
      totalWeight: separations.reduce((sum, sep) => sum + (sep.totalWeight || 0), 0),
      typeWeights: {
        metal: separations.reduce((sum, sep) => sum + (sep.weights.metal || 0), 0),
        clothes: separations.reduce((sum, sep) => sum + (sep.weights.clothes || 0), 0),
        food: separations.reduce((sum, sep) => sum + (sep.weights.food || 0), 0),
        organic: separations.reduce((sum, sep) => sum + (sep.weights.organic || 0), 0),
        plastic: separations.reduce((sum, sep) => sum + (sep.weights.plastic || 0), 0),
        paper: separations.reduce((sum, sep) => sum + (sep.weights.paper || 0), 0),
        glass: separations.reduce((sum, sep) => sum + (sep.weights.glass || 0), 0),
        electronic: separations.reduce((sum, sep) => sum + (sep.weights.electronic || 0), 0)
      }
    };

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}; 