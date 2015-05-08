var express    = require('express')
var path       = require('path')
var port       = process.env.PORT || 3000
var app        = express()
var mongoose   = require('mongoose')
//存在session信息
var mongoStore = require('connect-mongo')(express)

//链接到数据库
var dbUrl = 'mongodb://localhost/aaron'
mongoose.connect(dbUrl)

//设置模板
app.set('views', './app/views/pages/')
app.set('view engine', 'jade')
//post中间件
app.use(express.bodyParser())

//session处理
//引入mongoStore保存到数据库
app.use(express.cookieParser())
app.use(express.session({
	secret : 'aaron',
	store  : new mongoStore({ //建立mongo链接
		url        : dbUrl,
		collection : 'sessions' //存放的表中
	})
}))

//设置开发环境
if ('development' === app.get('env')) {
	//打印错误
	app.set('showStackError', true)
	app.use(express.logger(':method :url :status'))
	// 不压缩源码
	app.locals.pretty = true
	mongoose.set('debug', true)
}

//路由地址
require('./config/routes')(app)

//本地资源路径
app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)


console.log('started on port ' + port)
