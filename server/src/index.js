require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const baseRouter = require('./routes');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

// CORS configuration
// Support both production and local development
const allowedOrigins = [
  process.env.FRONTEND_URL, // Production frontend URL
  'http://localhost:5173',   // Local development
  'http://localhost:3000',   // Alternative local port
].filter(Boolean); // Remove undefined values

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Root route - friendly message
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'StudyTrackr API is running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      docs: 'See README.md for API documentation',
    },
  });
});

app.use('/api', baseRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;

