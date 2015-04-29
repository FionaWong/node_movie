var _ = require('underscore')
//电影模型
var Movie = require('../app/models/movie')
//用户登录/注册
var User = require('../app/models/User')

module.exports = function(app) {

	app.use(function(req, res, next) {
		var _user = req.session.user;
		if (_user) {
			app.locals.user = _user;
		}
		next()
	})

})

}