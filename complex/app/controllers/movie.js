//电影模型
var Movie = require('../models/movie')
//评论模型
var Comment = require('../models/comment')
var _ = require('underscore')


//详情页面
//通过id 获取详情页面的指定数据
exports.detail = function(req, res) {
	var id = req.params.id
	Movie.findById(id, function(err, movie) {
		//查到对应的评论数据
		Comment
			.find({movie:id}
			.populate('from','name')
			.exec(function(err,comments){
			console.log(comments)
					res.render('detail', {
						title    : movie.title,
						movie    : movie,
						comments : comments
					})
				})
	})
}

//输入信息
exports.new = function(req, res) {
	//数据录入页面
	res.render('new', {
		title: 'imooc 后台',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: '',
		}
	})
}


//数据更新
exports.update = function(req, res) {
	var id = req.params.id
	if (id) {
		Movie.findById(id, function(err, movie) {
			//查询到对应数据,显示出来
			res.render('new', {
				title: '后台更新页',
				movie: movie
			})
		})
	}
}


//通过后端录过的数据
//1 新增
//2 更新
exports.save = function(req, res) {
	//获取表单的数据
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _moive
		//如果隐藏表单的id存在
		//证明是更新数据
		//否则是新增
	if (id !== 'undefined') {
		Movie.findById(id, function(err, movie) {
			if (err) {
				console.log(err)
			}
			_moive = _.extend(movie, movieObj)
			_moive.save(function(err, movie) {
				if (err) {
					console.log(err)
				}
				res.redirect('/admin/movie/detail/' + id)
			})
		})
	} else {
		//新增
		_moive = new Movie({
			doctor   : movieObj.doctor,
			title    : movieObj.title,
			country  : movieObj.country,
			language : movieObj.language,
			year     : movieObj.year,
			poster   : movieObj.poster,
			flash    : movieObj.flash,
			summary  : movieObj.summary
		})

		_moive.save(function(err, movie) {
			if (err) {
				console.log(err)
			}
			console.log('信息录入成功')
			//数据保存成功后,定位到显示页面
			res.redirect('/admin/movie/detail/' + _moive._id)
		})
	}
}


//后台数据列表
exports.list = function(req, res) {
	Movie.fetch(function(err, movies) {
		res.render('list', {
			title: '列表',
			movies: movies
		})
	})
}


//删除功能
exports.delete = function(req, res) {
	var id = req.query.id
	if (id) {
		Movie.remove({
			_id: id
		}, function(err, movie) {
			if (err) {
				console.log(err)
			} else {
				res.json({
					success: 1
				})
			}
		})
	}
}