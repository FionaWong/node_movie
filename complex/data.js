var mongoose = require("mongoose");

var db = mongoose.connection;    

db.on('error',console.error);
db.once('open',function(){
	console.log('连接成功')
    //在这里创建你的模式和模型
});   

mongoose.connect('mongodb://localhost/aaron');   


var movieSchema = new mongoose.Schema({
	doctor   : String,
	title    : String,
	language : String,
	country  : String,
	year     : Number,
	summary  : String,
	poster   : String,
	flash    : String
})

movieSchema.statics.findAllWithCreditCookies = function(callback){
    return this.find({ hasCreditCookie: true}, callback);
};

movieSchema.pre('save', true, function(next,done) {
	// var err = new Error('something went wrong');
	// next(err);
	console.log('异步中间件')
	next();
	setTimeout(function(){
		console.log('done')
		done();
	},1000)
})

movieSchema.post('save', function (doc) {
  console.log('%s has been saved', doc._id);
})


var Movie = mongoose.model('Movie', movieSchema);


// console.log(Movie)

// Movie.findAllWithCreditCookies(function(err, movies) {
// 	if (err) return console.error(err);
// 	console.dir(movies);
// });

//通过名字查找一部电影
// Movie.findOne({
// 	year: 2018
// }, function(err, thor) {
// 	if (err) return console.err(err);
// 	console.dir(thor);
// });

//查找所有电影    
// Movie.find(function(err,movies){
//     if(err) return console.err(err);
//     console.dir(movies);
// });    

var move = new Movie({
	title    : '黑衣人三',
	doctor   : '史密斯',
	year     : 2018,
	poster   : "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/super/whfpf=425,260,50/sign=8ccf579c063b5bb5be8273be50eee10b/b21bb051f81986189281b9b34fed2e738ad4e6c7.jpg",
	flash    :'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
	country  :'美国',
	language :'英语',
	summary  :'好片'
})



move.save(function (err) {
  if (err){
  	 console.log('保存失败')
  	 return;
  }
  console.log('meow');
});