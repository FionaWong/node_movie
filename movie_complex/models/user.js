var mongoose = require('mongoose')
var Userchema = require('../schemas/user')
var User = mongoose.model('User', Userchema)

module.exports = User