const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const config = require('../config');

const jwtVerify = promisify(jwt.verify)
module.exports.authenticate =
  (req, res, next) => {
    const token = req.header('token')
    jwtVerify(token, config.SECRET_KEY)
      .then((decode) => {
        if (decode) {
          req.user = decode
          return next()
        }
      })
      .catch(() => res.status(401).json({ meassage: 'User is not authentecated'}))
}
//userTypeArray = ["admin", "client"]
// 1. "admin" ---> "admin" = user.userType ===> next();
// 2. "client" ---> "client" = user.userType ===> next();
module.exports.authorize = (userTypeArray) => {
  return (req, res, next) => {
    const {user} = req

    if(userTypeArray.findIndex(elm => elm === user.userType) > -1) return next();
    // if (userType === user.userType) return next();
    return res.status(403).json({
      msg: 'Ban da dang nhap nhung khong co quyen xem'
    })
  }
}
