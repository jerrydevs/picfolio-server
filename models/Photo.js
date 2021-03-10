var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var photoSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  photo: {
    type: Buffer
  },
  caption: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
  });
module.exports = mongoose.model('photo', photoSchema);