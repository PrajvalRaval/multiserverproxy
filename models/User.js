const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  serverurl: {
    type: String,
    required: true
  },
  servername: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userid: {
    type: String,
    required: true
  },
  authtoken: {
    type: String,
    required: true
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;