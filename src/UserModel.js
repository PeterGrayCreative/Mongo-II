const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  soUserId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required:true,
  },
  reputation: {
    type: Number,
    required:true
  }
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;