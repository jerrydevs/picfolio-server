const multer = require('multer');
const path = require('path');

const storageEngine = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'profileUploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});

const uploadProfilePhoto = multer({
  storage: storageEngine
});

module.exports = uploadProfilePhoto;
