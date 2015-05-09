var express    = require('express')
var app        = express()
  
app.set('views', './page/')
app.set('view engine', 'jade')
//模版
app.get('/', function(req, res) {
	res.render('test',{
		name:'Aaron'
	})
});

//数据操作
require('./data')(app)

app.listen(3000)