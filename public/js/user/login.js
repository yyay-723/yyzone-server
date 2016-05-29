var globalObj = globalObj || {};
globalObj = $.extend(globalObj, {
	initEvent: function() {
		$("#login-btn").click(function(){
			var username = $("#login_username").val();
			var password = $("#login_password").val();
			if(!username){
				alert("用户名不能为空");
			}else if(!password){
				alert("密码不能为空");
			}else{
				$.ajax({
					type: "post",
					url: "/users/login",	
					data:{
						username : username,
						password : password
					},
					success: function(data) {	
						if(data.state == 1){
							alert("登陆成功");
						}else{
							alert("登录失败")
						}
					},
					error: function(data) {
						alert("异常");
					}
				});
			}
		})
	}
		
	
});
$(function(){
	globalObj.initEvent();
});