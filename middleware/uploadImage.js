const multer = require('multer')
const mkdirp = require('mkdirp')


module.exports.uploadImage = (type) => {
  mkdirp(`./uploads/${type}s`, (err) => {
    if(err) return console.log(err);
  })

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads/${type}s`)
    },
    filename: function (req, file, cb) {
      console.log(file)
      cb(null, file.fieldname + '-' + Date.now() + file.originalname)
    }
  })

  const upload = multer({ storage})
  return upload.single(type)
}
