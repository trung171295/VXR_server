const {User} = require('../../../models/user')
const bcrypt = require('bcrypt')
const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const config = require('../../../config')

/**
 * @todo register new user
 */
module.exports.createUser = (req, res, next) => {
  // body
  const {email, password, fullName} = req.body
  const newUser = new User({email, password, fullName})

  newUser.save()
    .then(user => res.status(200).json(user))
    .catch(err => {
      if (err.status) return res.status(err.status).json({ message: err.message })
      return res.status(500).json(err)
    })
}

/**
 * @todo login user
 */
const comparePassword = promisify(bcrypt.compare)
const jwtSign = promisify(jwt.sign)
module.exports.login = (req, res, next) => {
  const {email, password} = req.body
  User.findOne({email})
    .then(user => {
      if (!user) return Promise.reject({status: 404, message: 'User not found.'})

      return Promise.all([comparePassword(password, user.password), user])
    })
    .then(res => {
      const isMatch = res[0]
      const user = res[1]

      if (!isMatch) return Promise.reject({status: 400, message: 'Password is incorrect.'})

      const payload = {
        email: user.email,
        userType: user.userType
      }

      return jwtSign(
        payload,
        config.SECRET_KEY,
        {expiresIn: 3600}
      )
    // return res.status(200).json({message: 'Login successfully'})
    })
    .then(token => {
      return res.status(200).json({
        message: 'Login successfully',
      token})
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json({message: err.message})
      return res.status(500).json(err)
    })
}

module.exports.getUserAll = (req, res, next) => {
  User.find()
    .then(User => res.status(201).json(User))
    .catch(err => res.status(500).json(err))
}

module.exports.getUserById = (req, res, next) => {
  const {id} = req.params
  User.findById(id)
    .then(User => res.status(201).json(User))
    .catch(err => res.status(500).json(err))
}

module.exports.updateUserById = (req, res, next) => {
  const {fromStation, toStation, startTime, price} = req.body
  const {id} = req.params
  User.findById(id)
    .then(User => {
      if (!User) return Promise.reject({status: 404, message: 'User not found'})

      // body

      return User.save()
    })
    .then(User => res.status(200).json(User))
    .catch(err => {
      if (err.status) return res.status(err.status).json({
          message: err.message
        })
      return res.status(500).json(err)
    })
}

module.exports.deleteUserById = (req, res, next) => {
  const {id} = req.params
  User.deleteOne({_id: id})
    .then((result) => {
      if (result.n === 0) return Promise.reject({status: 404, message: 'User not found'})

      res.status(200).json({message: 'Delete success'})
    })
    .catch(err => {
      if (err.status) return res.status(err.status).json({
          message: err.message
        })
      return res.status(500).json(err)
    })
}

module.exports.uploadAvatar = (req, res, next) => {
  const {email} = req.user
  User.findOne({email: email})
    .then(user => {
      user.avatar = req.file.path
      return user.save()
    })
    .then(user => res.status(200).json(user))
    .catch(err => res.json(err))
}
