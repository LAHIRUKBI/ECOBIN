import ConfirmOrder from '../model/confirm.model.js';

export const confirmOrder = async (req, res) => {
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
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};



export const getConfirmedOrders = async (req, res) => {
  try {
    const confirmedOrders = await ConfirmOrder.find();
    res.status(200).json({ success: true, data: confirmedOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};



// Controller to delete a confirmed order by orderId
export const deleteConfirmedOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const deletedOrder = await ConfirmOrder.findOneAndDelete({ orderId }); // Use orderId here instead of _id

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error });
  }
};
