var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password1: { type: String, required: true },
  password2: { type: String, required: true },
  zipCode: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address1: { type: String},
  address2: { type: String},
  state: { type: String},
  created_at: Date,
  updated_at: Date
});

var User = mongoose.model('User', userSchema);

// Make this available to our other files
module.exports = User;