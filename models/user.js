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
  userid: {
    type: String,
    required: true
  },
  authtoken: {
    type: String,
    required: true
  },
  expireAt: { type: Date, default: Date.now, index: { expires: '5m' } }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
