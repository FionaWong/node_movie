//路由控制器
var Index   = require('../app/controllers/index')
var User    = require('../app/controllers/user')
var Movie   = require('../app/controllers/movie')
var Comment = require('../app/controllers/comment')

module.exports = function(app) {

	//访问预处理，写入session的信息到本地locals.user中
	app.use(function(req, res, next) {
		var _user = req.session.user;
		if (_user) {
			app.locals.user = _user;
		}
		next()
	})

	//首页
	app.get('/',Index.index)

  //用户管理
  //登录框
  app.get('/signin', User.showSignin)
  app.get('/signup', User.showSignup)

  //登录页面
  app.post('/user/signin',User.signin)
  app.post('/user/signup', User.signup)

  //退出
  app.get('/logout', User.logout)

  //登录权限->管理权限
  app.get('/admin/userlist', User.signinRequired, User.adminRequired, User.userlist)

  //电影处理
  app.get('/admin/movie/detail/:id', Movie.detail)
  app.get('/admin/movie/list', Movie.list)
  //信息更新
  app.get('/admin/movie/update/:id',  Movie.update)
  //信息输入
  app.get('/admin/movie/new',  Movie.new)
  //后台输入
  app.post('/admin/movie/update', Movie.save)
  //删除
  app.delete('/admin/movie/list', Movie.delete)

  //评论
  app.post('/user/comment', Comment.save)

}

