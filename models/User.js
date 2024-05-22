const {Schema, model} = require('mongoose');

const User = new Schema({
  username: {type: String, unique: true, required: true},
  name: {type: String, required: true},
  surname: {type: String, required: true},
  patronymic: {type: String, required: false},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true},
})

module.exports = model('User', User);