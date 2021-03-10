const multer = require('multer');
const path = require('path');

const storageEngine = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'uploads');
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  },
  limits: { filseSize: 100000000000 }
});

const upload = multer({
  storage: storageEngine
});

module.exports = upload;
