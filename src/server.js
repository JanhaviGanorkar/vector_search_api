// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const helmet = require('helmet');
// const dotenv = require('dotenv');
// const documentRoutes = require('./routes/api/documents');

// // Load environment variables
// dotenv.config();

// const app = express();

// // Security middleware
// app.use(helmet());
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// // Body parser middleware
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/documents', documentRoutes);

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({
//     status: 'ok',
//     timestamp: new Date(),
//     uptime: process.uptime()
//   });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: 'Something went wrong!',
//     message: err.message
//   });
// });

// // MongoDB connection string
// const mongoURI = MONGO_URL

// // Connect to MongoDB
// mongoose.connect(mongoURI)
//   .then(() => {
//     console.log('MongoDB connected successfully');
//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   });

// // Graceful shutdown
// const shutdown = async () => {
//   try {
//     await mongoose.connection.close();
//     server.close(() => {
//       console.log('Server and MongoDB connection closed gracefully');
//       process.exit(0);
//     });
//   } catch (err) {
//     console.error('Error during shutdown:', err);
//     process.exit(1);
//   }
// };

// // Handle shutdown signals
// process.on('SIGTERM', () => {
//   console.log('SIGTERM received. Shutting down gracefully');
//   server.close(() => {
//     mongoose.connection.close(false, () => {
//       console.log('MongoDB connection closed.');
//       process.exit(0);
//     });
//   });
// });
// process.on('SIGINT', shutdown);


// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware for CORS and other settings
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use(express.json());

// MongoDB connection with status check
async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    mongoose.connection.on('error', err => {
      console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
    });

  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
}

// Initialize connection
connectDB();

// Simple connection test endpoint
app.get('/api/status', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const states = {
    0: "disconnected",
    1: "connected",
    2: "connecting",
    3: "disconnecting",
  };
  res.json({
    database: {
      state: states[dbState],
      host: mongoose.connection.host,
      name: mongoose.connection.name
    },
    server: 'running'
  });
});

// Routes
app.use('/api/documents', require('./routes/api/documents'));
app.use('/api/auth', require('./routes/api/auth')); // Add this line

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
