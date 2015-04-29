var mongoose = require('mongoose')
//加密算法
// var bcrypt = require('bcrypt')
var SALT_WORK_FACTOR = 10


var UserSchema = new mongoose.Schema({
  name:{
    unique:true,
    type:String
  },
  password:String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})


UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()

  // //加密算法
  // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
  //   if (err) return next(err)
  //   //hash 
  //   //得到的新密码
  //   bcrypt.hash(user.password, salt, function(err, hash) {
  //     if (err) return next(err)
  //     user.password = hash
  //     next()
  //   })
  // })
})


//实例方法
UserSchema.methods = {
  comparePassword: function(_password, cb) {
    if(_password === this.password){
      cb(null,_password)
    }
  }
}


//静态方法
//=》模型
UserSchema.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function(id, cb) {
    return this
      .findOne({
          _id: id
      })
      .exec(cb)
  }
}

module.exports = UserSchema