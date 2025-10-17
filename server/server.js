// import dotenv from 'dotenv';
// dotenv.config();

// import express from 'express';
// import cors from 'cors';
// import connectDB from './config/db.js';
// import authRoutes from './routes/authRoutes.js';
// import apiRoutes from './routes/apiRoutes.js';

// // Connect to the database
// connectDB();
// const app = express();

// // Middleware
// const allowedOrigins = ['http://localhost:5173/']; // ✅ No trailing slash

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   credentials: true
// }));

// app.use(express.json());

// // --- Root Route ---
// app.get("/", (req, res) => {
//   res.send("✅ Backend is running successfully on Vercel!");
// });

// // --- API Routes ---
// app.use('/api/auth', authRoutes);
// app.use('/api', apiRoutes);

// // --- Export app for Vercel ---
// export default app;
// server.js (or whatever file you already have)
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

// Compute allowed origin(s)
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173'
];
// If you have multiple origins, you can comma-separate them in FRONTEND_URL and split here.

app.use(cors({
  origin: (origin, callback) => {
    // allow non-browser tools (like curl/postman) with no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed by server'), false);
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully on Vercel!");
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Export app for Vercel serverless wrapper
export default app;
