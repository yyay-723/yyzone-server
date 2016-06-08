var express = require('express');
var router = express.Router();
var Blog = require('../models').Blog;
var BlogCategory = require('../models').BlogCategory;
var User = require('../models').User;
var models = require('../models');

/* GET users listing. */
//获取登录界面
router.get('/new', function(req, res, next) {
	res.render("blog/new");
})
//新建博客
router.post('/new', function(req, res, next) {
	var title = req.body.title;
	var blogContent = req.body.content;
	var userId = 2;
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

//博客详情页面
router.get('/detail', function(req, res, next) {
	var blog_id = req.param("id");
	Blog.find({
		where: {
			id: blog_id
		},
		include: [
			{ model: models.User },
			{ model: models.BlogCategory }
		]
	}).then(function(blog){
		if(blog){
			var title = blog.title;
			var content = blog.content;
			var author = blog.User.username;
			var category = blog.BlogCategory.name;
			var time = blog.created_at;
			res.render("blog/detail",{
				title: title,
				content: content,
				author: author,
				time: time,
				category: category
			})
		}	
	})
})

//博客列表页
router.get('/list', function(req, res, next) {
	var per_page = 10;
	var page = req.param('page');
	if (page < 1) {
		page = 1;
	}
	Blog.findAndCountAll({
		order: [
			['id', 'DESC'],
			['created_at', 'DESC']
		],
		limit: per_page, // 每页多少条
		offset: per_page * (page - 1) // 跳过多少条
	}).then(function(blogs) {
		res.render("blog/list", {
			blogs: blogs,
			per_page: per_page,
			page: parseInt(page),
			count: blogs.count
		});
	});
});

module.exports = router;