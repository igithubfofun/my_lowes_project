var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  materials: Array,
  steps: Array,
  created_at: Date,
  updated_at: Date
});

var Project = mongoose.model('Project', projectSchema);

// Make this available to our other files
module.exports = Project;