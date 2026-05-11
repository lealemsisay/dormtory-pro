import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  blockNumber: { type: String, required: true },
  capacity: { type: Number, default: 4 },
  currentOccupants: { type: Number, default: 0 },
  occupants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  reservedForStaff: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

roomSchema.index({ roomNumber: 1, blockNumber: 1 }, { unique: true });

export const Room = mongoose.model('Room', roomSchema);
