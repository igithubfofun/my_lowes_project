var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

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

userSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password1')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    // hash the password along with our new salt
    bcrypt.hash(user.password1, salt, function(err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password1 = hash;
      user.password2 = hash;
      next();
    });
  });
});

var User = mongoose.model('User', userSchema);

// Make this available to our other files
module.exports = User;