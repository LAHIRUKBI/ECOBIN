import mongoose from 'mongoose';

const ConfirmSchema = new mongoose.Schema({
  customerEmail: String,
  bookTitle: String,
  customerName: String,
  customerAddress: String,
  customerPhone: String,
  totalPrice: Number,
  bankName: String,
  orderId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  confirmationDate: { type: Date, default: Date.now }, // Store the confirmation date
});

export default mongoose.model('ConfirmOrder', ConfirmSchema);
