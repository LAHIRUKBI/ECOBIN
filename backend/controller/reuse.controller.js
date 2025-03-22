import Reuse from '../model/reuse.model.js';

export const addReusable = async (req, res) => {
    try {
      console.log('Received data:', req.body); // Log the request body to verify incoming data
  
      const {
        plastic,
        glass,
        metals,
        aluminum,
        electronics,
        textiles,
        wood,
        lightBulbs,
        date
      } = req.body;
  
      // Validate and process data...
      const validatedData = {
        plastic: { ...plastic, amount: Math.max(plastic.amount, 0) },
        glass: { ...glass, amount: Math.max(glass.amount, 0) },
        metals: { ...metals, amount: Math.max(metals.amount, 0) },
        aluminum: { ...aluminum, amount: Math.max(aluminum.amount, 0) },
        electronics: { ...electronics, amount: Math.max(electronics.amount, 0) },
        textiles: { ...textiles, amount: Math.max(textiles.amount, 0) },
        wood: { ...wood, amount: Math.max(wood.amount, 0) },
        lightBulbs: { ...lightBulbs, amount: Math.max(lightBulbs.amount, 0) },
        date: new Date(date)
      };
  
      console.log('Validated Data:', validatedData); // Log validated data
  
      const newReuse = new Reuse(validatedData);
  
      await newReuse.save();
      res.status(201).json({ message: 'Data added successfully!' });
    } catch (error) {
      console.error('Error adding data:', error);
      res.status(500).json({ message: 'There was an error adding the data.' });
    }
  };
  
