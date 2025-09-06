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
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- API Routes ---

// Authentication routes
app.use('/api/auth', authRoutes);

// External API proxy routes
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
