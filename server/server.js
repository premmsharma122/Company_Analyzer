import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import apiRoutes from './routes/apiRoutes.js';

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// --- Root Route ---
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully on Vercel!");
});

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// --- Export app for Vercel ---
export default app;