require('dotenv').config()

let MONGO_URI
let SECRET_KEY
let PORT
let EMAIL
let PASSWORD
let HOST

switch (process.env.NODE_ENV) {
  case 'local':
    MONGO_URI = process.env.MONGO_URI_LOCAL
    SECRET_KEY = process.env.SECRET_KEY_LOCAL
    PORT = process.env.PORT_LOCAL
    EMAIL = process.env.EMAIL_LOCAL
    PASSWORD = process.env.PASSWORD_LOCAL
    HOST = `localhost${PORT}`
    break
  case 'production':
    MONGO_URI = process.env.MONGO_URI_STAGING
    SECRET_KEY = process.env.SECRET_KEY_STAGING
    EMAIL = process.env.EMAIL_STAGING
    PASSWORD = process.env.PASSWORD_STAGING
    HOST = 'https://vexere123.herokuapp.com'
    break
}

module.exports = {
MONGO_URI, SECRET_KEY, PORT, EMAIL, PASSWORD}
