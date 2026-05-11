import mongoose from 'mongoose';

const blockSchema = new mongoose.Schema({
  blockNumber: { type: String, required: true, unique: true },
  genderType: { type: String, enum: ['Male', 'Female', 'Mixed'], default: 'Mixed' },
  totalRooms: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const Block = mongoose.model('Block', blockSchema);
