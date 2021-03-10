var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var profilePhotoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  profilePhoto: {
    type: Buffer
  },
  date: {
    type: Date,
    default: Date.now
  }
  });
module.exports = mongoose.model('profilePhoto', profilePhotoSchema);
