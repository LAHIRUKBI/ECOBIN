import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    mainCategory: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    introduction: { type: String, required: true },
    image: { type: String }, // Store the image path
    serviceTime: { type: String, required: true }, // Store service completion time
    priority: { type: String, required: true },    // Store service priority
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
