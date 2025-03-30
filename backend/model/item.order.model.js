import mongoose from 'mongoose';

const ItemOrderSchema = new mongoose.Schema(
    {
        itemTitle: { type: String, required: true },
        totalPrice: { type: Number, required: true },
        customerName: { type: String, required: true },
        customerAddress: { type: String, required: true },
        customerPhone: { type: String, required: true },
        customerEmail: { type: String, required: true },
        bankName: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model('ItemOrder', ItemOrderSchema);
