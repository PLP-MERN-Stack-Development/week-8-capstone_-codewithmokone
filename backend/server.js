// Import required modules
// const express = require('express');
const app = require("./app");
const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
// const path = require('path');
// const bodyParser = require('body-parser');


// Load environment variables
// dotenv.config();

// Initialize Express app
// const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// app.use(cors());
// app.use(logger);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// Serve uploaded files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Log requests in development mode
// if (process.env.NODE_ENV === 'development') {
//   app.use((req, res, next) => {
//     console.log(`${req.method} ${req.url}`);
//     next();
//   });
// }

// API routes
// app.use('/api/employees', require('./routes/employeesRoutes'));
// app.use('/api/learners', require('./routes/learnersRoutes'));
// app.use('/api/user', require('./routes/userRoutes'));

// Root route
// app.get('/', (req, res) => {
//   res.send('MERN Blog API is running');
// });

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({
//     success: false,
//     error: err.message || 'Server Error',
//   });
// });

// Connect to MongoDB and start server
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Close server & exit process
  process.exit(1);
});

// module.exports = app; 