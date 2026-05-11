import mongoose from 'mongoose';

const maintenanceRequestSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roomNumber: { type: String, required: true },
  blockNumber: { type: String, required: true },
  issueType: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
}, { timestamps: true });

export const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
