import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema(
  {
    companyNumber: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
    phoneNumber: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    section: { type: String, required: true }, // New field
  },
  { timestamps: true }
);

export default mongoose.model('Employee', employeeSchema);
