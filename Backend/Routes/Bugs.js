import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();

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
  okbyReporter: {
    type: Boolean,
    default: false,
  },
});

const Bug = mongoose.model('BugReports', BugSchema, 'BugReports');

router.post('/', async (req, res) => {
  try {
    const { email, bugDescription } = req.body;

    const bug = await Bug.create({ email, bugDescription });

    if (bug) {
      console.log('Bug submitted:', bug);
      res.send({
        status: 'Successful',
      });
    } else {
      console.error('Error saving bug');
      res.sendStatus(500);
    }
  } catch (error) {
    console.error('Error saving bug:', error);
    res.sendStatus(500);
  }
});

router.get('/', async (req, res) => {
  try {
    const bugReports = await Bug.find().sort({ date: -1 });
    console.log('Bug reports fetched:', bugReports);
    res.json(bugReports);
  } catch (error) {
    console.error('Error fetching bug reports:', error);
    res.sendStatus(500);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { okbyReporter } = req.body;

    const bug = await Bug.findByIdAndUpdate(id, { okbyReporter }, { new: true });
    if (bug) {
      console.log('Bug report updated:', bug);
      res.sendStatus(200);
    } else {
      console.error('Bug report not found');
      res.sendStatus(404);
    }
  } catch (error) {
    console.error('Error updating bug report:', error);
    res.sendStatus(500);
  }
});

export default router;
