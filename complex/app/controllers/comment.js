
var Comment = require('../models/comment')

//评论保存
exports.save = function(req, res) {
	var _comment = req.body.comment
	var movieId = _comment.movie
	var comment = new Comment(_comment)
	comment.save(function(err, conment) {
		if (err) {
			console.log(err)
		}
		res.redirect('/admin/movie/' + movieId)
	})
}