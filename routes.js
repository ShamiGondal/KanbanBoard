// In your server app.js or a dedicated routes file

// Import necessary modules
const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();
const University = require('./Schema'); // Assuming you have a University model



router.post('/addUniversities', async (req, res) => {
    try {
      const universitiesData = req.body;
  
      // Create an array of university documents
      const universities = universitiesData.map(({ title, status }) => ({
        title,
        status,
      }));
  
      // Save the universities to MongoDB
      await University.insertMany(universities);
  
      res.status(201).json({ message: 'Universities added successfully' });
    } catch (error) {
      console.error('Error storing universities:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // Endpoint to fetch all universities
// Example route to get tasks with a specific status
router.get('/getUniversities', async (req, res) => {
    try {
      const { status } = req.query;
      let query = {};
  
      if (status) {
        query = { status };
      }
  
      const universities = await University.find(query);
      res.json(universities);
    } catch (error) {
      console.error('Error fetching universities:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
// Update task status



router.put('/updateStatus/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
      // Find the task by ID
      const updatedUniversity = await University.findById(taskId);
  
      if (!updatedUniversity) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      // Determine the next status based on the current status
      switch (updatedUniversity.status) {
        case 'Backlog':
          updatedUniversity.status = 'Doing';
          break;
        case 'Doing':
          updatedUniversity.status = 'Review';
          break;
        case 'Review':
          updatedUniversity.status = 'Done';
          break;
        // Add more cases if needed
  
        default:
          break;
      }
  
      // Save the updated task
      await updatedUniversity.save();
  
      res.json(updatedUniversity);
    } catch (error) {
      console.error('Error updating task status:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.put('/updatePreStatus/:id', async (req, res) => {
    const taskId = req.params.id;
  
    try {
      // Find the task by ID
      const updatedUniversity = await University.findById(taskId);
  
      if (!updatedUniversity) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      // Determine the previous status based on the current status
      switch (updatedUniversity.status) {
        case 'Doing':
          updatedUniversity.status = 'Backlog';
          break;
        case 'Review':
          updatedUniversity.status = 'Doing';
          break;
        case 'Done':
          updatedUniversity.status = 'Review';
          break;
        // Add more cases if needed
  
        default:
          break;
      }
  
      // Save the updated task
      await updatedUniversity.save();
  
      res.json(updatedUniversity);
    } catch (error) {
      console.error('Error updating task status:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
// Delete task
router.delete('/deleteUnis/:id', async (req, res) => {
  const taskId = req.params.id;

  try {
    // Find the task by ID and delete it
    const deletedUniversity = await University.findByIdAndDelete(taskId);

    if (!deletedUniversity) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router
module.exports = router;
