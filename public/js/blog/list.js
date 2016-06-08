var globalObj = globalObj || {};
globalObj = $.extend(globalObj, {
	
	init: function() {
		//列表
		var url="/blogs/list";
		var data={};
		globalObj.blogList(url,data);
	},
	//查询博客列表
	blogList: function(url,data){
		ajaxUtil.ajax(url, data, function(data){
			var blogs = data.blogs;
			blogs.forEach(function(i){
				var li = "<li><a id='J_blogid_" + i.id + "' href=''>"+ i.title +"</a><a class='u-blog-edit' href=''>删除</a><a class='u-blog-edit' href=''>编辑</a></li>";
				$(".m-blog-list").append(li);
			})
		});
	}

});
$(function() {
	globalObj.init();
});