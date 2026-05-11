import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

// Import Backend Routes
import authRoutes from './backend/routes/authRoutes';
import studentRoutes from './backend/routes/studentRoutes';
import { User } from './backend/models/User';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedAdmin() {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      await User.create({
        fullName: 'System Administrator',
        registrar_id: 'RNS-ADMIN',
        role: 'admin',
        password: 'password', 
        isFirstLogin: false
      });
      console.log('✅ Default admin created: RNS-ADMIN / password');
    }
  } catch (e) {
    console.error('Seeding error:', e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(express.json());
  app.use(cookieParser());

  // Database Connection
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (MONGODB_URI) {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('MongoDB connected successfully');
      await seedAdmin();
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  } else {
    console.warn('MONGODB_URI not found. Please provide a connection string in .env');
  }

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/students', studentRoutes);

  // Health Check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🚀 Server running at http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}\n`);
  });
}

startServer();
