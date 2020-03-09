const express = require('express')
const UserController = require('./users')
const {authenticate, authorize} = require('../../../middleware/auth')
const {uploadImage} = require('../../../middleware/uploadImage')
const {validatePostUser} = require('../../../validations/users/validate.post.user')

const router = express.Router()

router.post(
  '/',
  validatePostUser,
  UserController.createUser)

router.get('/', UserController.getUserAll)
router.post('/login', UserController.login)

router.post(
  '/uploadavatar',
  authenticate,
  uploadImage('avatar'),
  UserController.uploadAvatar
)

// Test private
router.get('/test',
  authenticate,
  authorize(['admin', 'client']),
  (req, res, next) => {
    res.status(200).json({
      message: 'ban da thay dieu khong nen thay'
    })
  })

  router.get('/', UserController.getUserAll)
module.exports = router
