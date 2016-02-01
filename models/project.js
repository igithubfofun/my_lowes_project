var mongoose = require('mongoose');

var projectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  projectName: { type: String, required: true },
  projectStyle: { type: String},
  album: { type: Array, required: true },
  category: { type: String, required: true },
  material: { type: String},
  created_at: Date,
  updated_at: Date
});

var Project = mongoose.model('Project', projectSchema);

// Make this available to our other files
module.exports = Project;
