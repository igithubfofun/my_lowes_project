git var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  album: Array,
  category: String,
  created_at: Date,
  updated_at: Date
});

var Project = mongoose.model('Project', projectSchema);

// Make this available to our other files
module.exports = Project;