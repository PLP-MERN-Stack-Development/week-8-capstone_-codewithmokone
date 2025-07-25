const Activity = require('../models/activityModel');

// GET all activities
exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
    res.json(activities)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// POST create new activity
exports.createActivity = async (req, res) => {
  console.log(req.body);
  try {
    const { title, category, description, time, status } = req.body;

    const activityData = {title, category, description, time, status };

    const activity = await Activity.create(activityData)
    res.status(201).json(activity);
  } catch (error) {
    console.log("Failed to create the  activity.", error);
    
    res.status(400).json({ message: error.message });
  }
}