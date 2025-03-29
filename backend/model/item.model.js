import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    discription: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    userEmail: { type: String}
  },
  { timestamps: true }
);

export default mongoose.model('Item', ItemSchema);
