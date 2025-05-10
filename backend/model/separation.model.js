import mongoose from 'mongoose';

const SeparationSchema = new mongoose.Schema({
  weights: {
    metal: { type: Number, default: 0 },
    clothes: { type: Number, default: 0 },
    food: { type: Number, default: 0 },
    organic: { type: Number, default: 0 },
    plastic: { type: Number, default: 0 },
    paper: { type: Number, default: 0 },
    glass: { type: Number, default: 0 },
    electronic: { type: Number, default: 0 }
  },
  totalWeight: {
    type: Number,
    default: 0
  },
  separationDate: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Separation', SeparationSchema); 