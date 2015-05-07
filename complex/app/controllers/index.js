//电影模型
var Movie = require('../models/movie')

//首页
exports.index = function(req,res) {
	Movie.fetch(function(err, movies) {
		console.log(movies)
		res.render('index', {
			title: '电影首页',
			movies: movies
		})
	})
}