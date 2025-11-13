require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const baseRouter = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', baseRouter);

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;

