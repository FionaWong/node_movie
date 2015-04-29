//电影模型
var Movie = require('../models/movie')

export.index = function() {
	//首页
	app.get('/', function(req, res) {
		Movie.fetch(function(err, movies) {
			res.render('index', {
				title: '电影首页',
				movies: movies
			})
		})
	})
}