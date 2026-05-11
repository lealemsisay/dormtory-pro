import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  admission_number: { type: String, unique: true, sparse: true },
  registrar_id: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['admin', 'staff', 'student'], default: 'student' },
  password: { type: String, required: true },
  gender: { type: String, enum: ['Male', 'Female'] },
  department: { type: String },
  phoneNumber: { type: String },
  assignedRoom: { type: String },
  assignedBlock: { type: String },
  isFirstLogin: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  avatar: { type: String },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', userSchema);
