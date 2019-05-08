var mongoose = require('mongoose')
var Schema = mongoose.Schema


var userSchema = new Schema({
  'username':{type:String},
  'password':String,
  'userphone':String,
  'useraddress':String
})

module.exports = mongoose.model('User',userSchema)
