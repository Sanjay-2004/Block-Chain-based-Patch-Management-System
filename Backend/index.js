import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

// Import the bugs route file
import bugsRouter from './Routes/Bugs.js';

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://Sanjay:Sanjay.04@blcpmgmt.scewiep.mongodb.net/Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to BLCPMGMT database');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

// Register the bugs route
app.use('/create-bug', bugsRouter);

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
