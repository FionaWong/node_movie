//用户登录/注册
var User = require('../app/models/User')


export.signup = function() {
	//用户注册
	app.post('/user/signup', function(req, res) {
		// req.query
		// req.params
		var _user = req.body.user;
		//是不是重复增加
		User.findById({
			name: _user.name
		}, function(err, user) {
			if (user) {
				return res.redirect('/admin')
			}
			var user = new User(_user)
			user.save(function(err, user) {
				if (err) {
					console.log(err)
				}
				res.redirect('/admin/userlist')
			})
		})
	})

}

export.signup = function() {
	//用户登录
	app.post('/user/signin', function(req, res) {
		var _user = req.body.user
		var name = _user.name
		var password = _user.passworda
		User.findOne({
			name: name
		}, function(err, user) {
			if (err) {
				console.log(err)
			}
			if (!user) {
				return res.redirect('/signup')
			}
			user.comparePassword(password, function(err, isMatch) {
				if (err) {
					console.log(err)
				}
				if (isMatch) {
					//保存登陆成功会话
					req.session.user = user
					return res.redirect('/')
				} else {
					return res.redirect('/signin')
				}
			})
		})
	})

}

export.userlist = function() {
	//用户列表
	app.get('/admin/userlist', function(req, res) {
		User.fetch(function(err, users) {
			if (err) {
				console.log(err)
			}
			res.render('userlist', {
				title: '用户列表',
				users: users
			})
		})
	})
}

export.logout = function() {
	//退出销毁session
	app.get('/logout', function(req, res) {
		delete req.session.user
		delete app.locals.user
		res.redirect('/')
	})
}