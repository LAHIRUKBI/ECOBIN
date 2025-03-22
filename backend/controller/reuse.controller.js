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
  

  export const getReusables = async (req, res) => {
    try {
      const reusables = await Reuse.find();  // Fetch all reusable data from the database
      res.status(200).json(reusables);  // Return the list as a JSON response
    } catch (error) {
      console.error('Error fetching reusables:', error);
      res.status(500).json({ message: 'There was an error fetching the data.' });
    }
  };


  export  const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await Reuse.findByIdAndDelete(id);
        res.status(200).json({ message: 'Item deleted successfully!' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Error deleting item.' });
    }
};


export const updateItem = async (req, res) => {
  try {
      const { id } = req.params;
      const updateData = req.body;

      // Ensure valid fields are being updated
      const updatedItem = await Reuse.findByIdAndUpdate(id, updateData, { new: true });

      if (!updatedItem) {
          return res.status(404).json({ message: 'Item not found.' });
      }

      res.status(200).json({ message: 'Item updated successfully!', data: updatedItem });
  } catch (error) {
      console.error('Error updating item:', error);
      res.status(500).json({ message: 'Error updating item.' });
  }
};
