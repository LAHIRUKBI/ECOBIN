import ItemOrder from '../model/item.order.model.js';

export const createItemOrder = async (req, res, next) => {
    try {
        console.log("Received ItemOrder Data:", req.body); 

        const { itemTitle, totalPrice, customerName, customerAddress, customerPhone, customerEmail, bankName } = req.body;

        // Validate required fields
        if (!itemTitle || !totalPrice || !customerName || !customerAddress || !customerPhone || !customerEmail || !bankName) {
            return res.status(400).json({ 
                success: false, 
                message: "Missing required fields" 
            });
        }

        const newItemOrder = new ItemOrder({
            itemTitle,
            totalPrice,
            customerName,
            customerAddress,
            customerPhone,
            customerEmail,
            bankName,
        });

        const savedItemOrder = await newItemOrder.save();
        console.log("Saved ItemOrder:", savedItemOrder);

        res.status(201).json({ 
            success: true, 
            data: savedItemOrder 
        });
    } catch (err) {
        console.error("ItemOrder Save Error:", err);
        next(err);
    }
};

export const getAllItemOrders = async (req, res, next) => {
    try {
        const itemOrders = await ItemOrder.find();
        res.status(200).json({ 
            success: true, 
            data: itemOrders 
        });
    } catch (err) {
        next(err);
    }
};


export const deleteItemOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedItemOrder = await ItemOrder.findByIdAndDelete(id);

        if (!deletedItemOrder) {
            return res.status(404).json({ 
                success: false, 
                message: 'ItemOrder not found.' 
            });
        }

        res.status(200).json({ 
            success: true, 
            message: 'ItemOrder deleted successfully.',
            data: deletedItemOrder 
        });
    } catch (error) {
        console.error('Error deleting ItemOrder:', error);
        next(error);
    }
};
