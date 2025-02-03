import 'dotenv/config'; // Load environment variables
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import workoutRoutes from './routes/workouts.js'; // Ensure to include the .js extension
const userRoutes = require("./routes/user.js")




// Express app
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use(cors());
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);


// Connect to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    // Listen on port
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error(err);
  });
