const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: String,
  birthDate: String,
  imgUrl: String,
  gender: {
    type: String,
    enum: ['man', 'woman']
  },
  starredPostIds: Array
});

module.exports = mongoose.model('User', userSchema);
