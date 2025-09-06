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
const port = process.env.PORT || 5000; // use env port if available

// Middleware
app.use(cors());
app.use(express.json());

// --- Root Route ---
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});

// --- API Routes ---
// Authentication routes
app.use('/api/auth', authRoutes);

// External API proxy routes
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
