var express = require('express');
var router = express.Router();
var User = require('../models').User;
var md5 = require('MD5');

/* GET users listing. */
//获取登录界面
router.get('/login',function(req, res, next){
	res.render("user/login");
})
router.post('/login',function(req, res, next){
	var username = req.body.username;
	var password = req.body.password;
	User.find({
		where : {
			username : username,
			password : md5(password)
		}
	}).then(function(user){
		var state = 0
		if(user){
			state = 1
		}
		res.json({
			state : state
		})
	})

})

router.get('/', function(req, res, next) {
	var per_page = req.param('per_page', 1);
	var page = req.param('page', 1);
	if (page < 1) {
		page = 1;
	}
	User.findAndCountAll({
		where: {
			role: 1
		},
		order: [
			['id', 'DESC'],
			['created_at', 'DESC']
		],
		attributes: [
			'username',
			"password",
			"role"
		],
		limit: per_page, // 每页多少条
		offset: per_page * (page - 1) // 跳过多少条
	}).then(function(users) {
		res.json({
			title: '用户',
			per_page: per_page,
			page: parseInt(page),
			count: users.count,
			users: users.rows
		});
	});
});

//	User.find({
//		where: {
//			username: username,
//		}
//	}).then(function(user) {
//		if (user) {
//			res.json({
//				result: '该用户已存在'
//			});
//		} else {
//			User.create({
//				username: username,
//				password: md5(password),
//				role: 1 //一般用户
//			}).then(function(user) {
//				res.json({
//					result: '添加用户成功'
//				});
//			});
//		}
//	});

//})

module.exports = router;