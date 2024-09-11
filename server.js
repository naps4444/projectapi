const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db');
const resourceRoutes = require('./routes/resourceRoutes');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // Your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
};

// Enable CORS with the specified options
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api', resourceRoutes);

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
