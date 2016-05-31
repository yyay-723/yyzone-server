var globalObj = globalObj || {};
require(["jquery", "ajax", "common"], function(){
	globalObj = $.extend(globalObj, {
		
		initEvent: function() {
			$("#login-btn").click(function(){
				var username = $("#login_username").val();
				var password = $("#login_password").val();
				var url = "/users/login";
				var data = {
					username : username,
					password : password
				}
				if(!username){
					alert("用户名不能为空");
				}else if(!password){
					alert("密码不能为空");
				}else{
					ajaxUtil.ajax(url, data, function(data){
						if(data.state == 1){
							alert("登陆成功");
						}else{
							alert("登录失败")
						}
					});
				}
			})
		}
		
	});
	
	$(function(){
		globalObj.initEvent();
	});
})