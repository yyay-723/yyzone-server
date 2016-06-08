var globalObj = globalObj || {};
globalObj = $.extend(globalObj, {
	
	initEvent: function() {

		//博客分类下拉框
		var drop = $(".u-select-drop");
		var me_select = $("#J_select");
		me_select.click(function() {
			drop.slideDown();
		})
		drop.click(function() {
			$(this).slideUp();
		})
		$(".u-select-drop ul li").click(function() {
			$("#J_select input").val($(this).text());
		})

		//添加分类
		var mask = $(".m-pop-mask");
		var pop_addtype = $(".m-pop.m-addtype");
		$("#J_addType").click(function() {
			mask.show();
			pop_addtype.show();
		})
		$(".m-addtype .u-pop-close").click(function() {
			mask.hide();
			pop_addtype.hide();
		})

		//标签框点击使文本框得到焦点
		$(".m-label-input").click(function() {
			$(this).children("input").focus();
		})

		//标签
		var tag = $(".J_tag");
		tag.click(function() {
				tag_txt = $(this).text();
				var tag_string = "<div class='m-label-1'>" + tag_txt + "<em></em></div>";
				var tag_num = $(".m-label-1").length;
				if (tag_num < 5) {
					$("#J_label_input").before(tag_string);
					globalObj.clickDelTag();
				} else {
					alert("标签数不能超过5个");
				}

			})
			//空格添加新标签
		$('#J_label_input').bind('input propertychange', function() {
				var input_txt = $(this).val();
				if (input_txt.indexOf(" ") >= 0) {
					var tag_string = "<div class='m-label-1'>" + input_txt + "<em></em></div>";
					var tag_num = $(".m-label-1").length;
					if (tag_num < 5) {
						$("#J_label_input").before(tag_string);
						$(this).val("");
						globalObj.clickDelTag();
					} else {
						setTimeout(
							function() {
								alert("标签数不能超过5个")
							}, 200);
					}
				}
			})
			//退格删除一个标签
		$('#J_label_input').keydown(function(e) {
			var input_txt = $(this).val();
			var tag_list = $(".m-label-1");
			if ((e.keyCode == 8) && (input_txt.length == 0)) {
				if (tag_list.length > 0) {
					tag_list.eq(tag_list.length - 1).remove();
				}
			}
		})

		$(".m-authority ul li").toggle(
			function() {
				$(this).addClass("z-active");
			},
			function() {
				$(this).removeClass("z-active");
			}
		)
		
		//发表
		$("#publish").click(function(){
			var url = "/blogs/new";
			var title = $("#J_blog_title").val();
			var content = UE.getEditor('editor').getContent();
			var isComment = $("#J_auth_comment").hasClass("z-active");
			var isPrivate = $("#J_auth_private").hasClass("z-active");
			var category = $("#J_select input").val();
			if(isComment){ 
				isComment = 1;
			}else{ isComment = 0; }
			if(isPrivate){
				isPrivate = 1;
			}else{ isPrivate = 0; }
			var data = {
				title : title,
				content : content,
				blog_categories : category,
				is_comment : isComment,
				is_private : isPrivate
			}
			if (!title){
				alert("标题为空将默认为当前时间")
			}else{
				globalObj.publishBlog(url,data)
			}
			
		})
	},

	//点击删除一个标签
	clickDelTag: function() {
		$(".m-label-1 em").unbind("click").click(function(e) {
			$(this).parent(".m-label-1").remove();
			e.stopPropagation();
		})
	},
	
	//发表博客
	publishBlog: function(url,data){
		ajaxUtil.ajax(url, data, function(data){
			if(data.state == 1){
				alert("创建博客成功");
				window.location.href="/blogs/list";
			}else{
				alert("创建失败")
			}
		});
	}

});
$(function() {

	globalObj.initEvent();
});