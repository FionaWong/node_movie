var express = require('express')
var app = express()

//post中间件
app.use(express.bodyParser())
app.set('views', './page/')
app.set('view engine', 'jade')

//数据操作对象
var User = require('./data/user')

//模版
app.get('/', function(req, res) {
	User.find(function(err, user) {
		res.render('test', {
			user: user
		})
	})
});

//保存数据
app.post('/add', function(req, res) {
	var user = req.body.user;
	if (!user) {
		console.log(user)
		return
	}
	var user = new User(user)
		//保存数据
	user.save(function(err) {
		if (err) {
			console.log('保存失败')
		}
		console.log('数据保存成功')
		return res.redirect('/')
	});
});


//修改数据
app.get('/update/:id', function(req, res) {
	var id = req.params.id;
	if (id) {
		//查找指定要修改的数据
		User.findOne({_id: id},function(err,oneUser){
			res.render('test', {
				 oneUser : oneUser
			})
		})
	}
})

//更新数据
app.post('/update', function(req, res) {
	var oneUser = req.body.oneUser;
	if (!oneUser) {
		return
	}
	User.update({_id: oneUser._id}, {
		$set: {name: oneUser.name,password:oneUser.password}
	}, function(err) {
		if(err){
			console.log(err)
			return
		}
		console.log('更新成功')
		return res.redirect('/')
	});
});


//删除数据
app.get('/delete/:id', function(req, res) {
	var id = req.params.id;
	if (id) {
		User.remove({
			_id: id
		}, function(err) {
			if (err) {
				console.log(err)
				return
			}
			console.log('删除成功')
			return res.redirect('/')
		});
	}
})

app.listen(3000)