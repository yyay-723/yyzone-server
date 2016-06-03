var express = require('express');
var router = express.Router();
var Blog = require('../models').Blog;
var BlogCategory = require('../models').BlogCategory;

/* GET users listing. */
//获取登录界面
router.get('/newBlog', function(req, res, next) {
	res.render("blog/newBlog");
})
//新建博客
router.post('/newBlog', function(req, res, next) {
	var title = req.body.title;
	var blogContent = req.body.content;
	var userId = 1;
	var categoryId;
	var name = req.body.blog_categories;
	var isComment = req.body.is_comment;
	var isPrivate = req.body.is_private;
	var viewCount = 1;
	var commentCount = 0;

	BlogCategory.findOrCreate({
		where : {
			name: name
		}
	}).then(function(category) {
		categoryId = category[0].id;
		Blog.create({
			title: title,
			content: blogContent,
			user_id: userId,
			category_id: categoryId,
			is_comment: isComment,
			is_private: isPrivate,
			view_count: viewCount,
			comment_count: commentCount
		}).then(function(user) {
			category[0].increment("blog_count");
			res.json({
				state: 1
			});
		});
	});
})
module.exports = router;