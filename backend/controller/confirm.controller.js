import ConfirmOrder from '../model/confirm.model.js';

// Create new confirmed order
export const createConfirmOrder = async (req, res) => {
  try {
    const { orderId, customerEmail, bookTitle, customerName, customerAddress, customerPhone, totalPrice, bankName } = req.body;

    // Check if order already exists
    const existingOrder = await ConfirmOrder.findOne({ orderId });
    if (existingOrder) {
      return res.status(400).json({ success: false, message: 'Order already confirmed' });
    }

    // Create new confirmed order
    const newOrder = new ConfirmOrder({
      orderId,
      customerEmail,
      bookTitle,
      customerName,
      customerAddress,
      customerPhone,
      totalPrice,
      bankName
    });

    await newOrder.save();
    res.status(201).json({ success: true, message: 'Order sent to collector successfully' });

  } catch (error) {
    console.error('Create confirm order error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get all confirmed orders
export const getConfirmOrders = async (req, res) => {
  try {
    const orders = await ConfirmOrder.find();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error('Get confirmed orders error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Get single confirmed order by ID
export const getConfirmOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log('Looking for order with ID:', orderId); // Debug log
    
    const order = await ConfirmOrder.findOne({ orderId });
    console.log('Found order:', order); // Debug log
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, data: order });
  } catch (error) {
    console.error('Get confirm order by ID error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// Delete confirmed order
export const deleteConfirmOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await ConfirmOrder.findOneAndDelete({ orderId });
    
    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete confirm order error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
