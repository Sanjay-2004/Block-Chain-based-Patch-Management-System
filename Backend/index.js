import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import bugsRouter from './Routes/Bugs.js';

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect('mongodb+srv://Sanjay:Sanjay.04@blcpmgmt.scewiep.mongodb.net/Project', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use('/create-bug', bugsRouter);
app.use('/bug-reports', bugsRouter); 

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
