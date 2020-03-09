const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { promisify } = require('util')

const UserSchema = new mongoose.Schema({
  email: {type: String, require: true},
  password: {type: String, require: true},
  fullname: {type: String, require: true},
  userType: {type: String, default: 'client'},
  avatar: {type: String}
})

/**
 * @todo register new user
 */
const genSalt = promisify(bcrypt.genSalt)
const hash = promisify(bcrypt.hash)

UserSchema.pre('save', function (next) {
  const user = this
  // console.log(user)
  if(!user.isModified('password')) return next();
  genSalt(10)
    .then(salt => {
      return hash(user.password, salt)
    })
    .then(hash => {
      user.password = hash
      next()
    })
})

const User = mongoose.model('User', UserSchema)
module.exports = {User, UserSchema}
