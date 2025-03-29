import Item from '../model/item.model.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

export const addItem = [
    upload.single('image'),
    async (req, res) => {
        try {
            const { name, discription, price, userEmail } = req.body;

            if (!name || !discription || !price || !userEmail) {
                return res.status(400).json({ message: 'All fields are required' });
            }

            const newItem = new Item({
                name,
                discription,
                price,
                userEmail,
                image: req.file ? req.file.filename : null,
            });

            await newItem.save();
            res.status(201).json({ message: 'Item added successfully', item: newItem });
        } catch (error) {
            console.error('Error adding item:', error);
            res.status(500).json({ message: 'Error adding item', error });
        }
    },
];

export const getItem = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ success: true, item: items });
    } catch (err) {
        console.error('Error fetching items:', err);
        res.status(500).json({ message: "Error fetching items", error: err });
    }
};

// Update Item by ID
export const updateItem = [
    upload.single('image'),
    async (req, res) => {
        try {
            const { name, discription, price, userEmail } = req.body;
            
            const updateData = {
                name,
                discription,
                price,
                userEmail
            };

            // If a new image was uploaded
            if (req.file) {
                updateData.image = req.file.filename;
                
                // Delete the old image if it exists
                const oldItem = await Item.findById(req.params.id);
                if (oldItem && oldItem.image) {
                    const oldImagePath = path.join(uploadsDir, oldItem.image);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
            }

            const updatedItem = await Item.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

            if (!updatedItem) {
                return res.status(404).json({ message: "Item not found" });
            }

            res.status(200).json({ 
                message: "Item updated successfully", 
                item: updatedItem 
            });
        } catch (error) {
            console.error("Error updating item:", error);
            res.status(500).json({ message: "Error updating item", error });
        }
    }
];
// Delete Item
export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Error deleting item', error });
    }
};

// Get Item By ID
export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ item });
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: "Error fetching item", error });
    }
};