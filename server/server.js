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
const allowedOrigins = ['http://localhost:5173/']; // ✅ No trailing slash

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

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
