import 'dotenv/config'; // Load environment variables
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import workoutRoutes from './routes/workouts.js'; // Ensure to include the .js extension
import userRoutes from './routes/user.js'; // Use import instead of require

// Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// CORS setup to allow only the frontend domain (adjust if necessary)
app.use(cors({
  origin: 'http://localhost:3000', // Allow only your frontend domain
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true, // Allow cookies if needed
}));

// Middleware for logging the requests
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
    // Start listening on the port defined in the environment variables
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is listening on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });
