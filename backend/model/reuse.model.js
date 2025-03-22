import mongoose from 'mongoose';

const reuseSchema = new mongoose.Schema({
  plastic: {
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  glass: {
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  metals: {
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  aluminum: {
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  electronics: {
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  textiles: {
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  wood: {
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  lightBulbs: {
    amount: { type: Number, required: true },
    unit: { type: String, required: true }
  },
  date: { type: Date, required: true }
});

const Reuse = mongoose.model('Reuse', reuseSchema);
export default Reuse;
