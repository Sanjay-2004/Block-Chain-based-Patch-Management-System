import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

// Import the Bug model
const BugSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  bugDescription: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Bug = mongoose.model('BugReports', BugSchema, 'BugReports');

// Define route handlers
router.post('/', async (req, res) => {
  try {
    const { email, bugDescription } = req.body;

    // Create a new bug instance
    const bug = await Bug.create({ email, bugDescription });

    if(bug){
      res.send({
        status: "Successful"
      })
    } else{
      console.error('Error saving bug');
      res.sendStatus(500);
    }
  } catch (error) {
    console.error('Error saving bug:', error);
    res.sendStatus(500);
  }
});

export default router;
