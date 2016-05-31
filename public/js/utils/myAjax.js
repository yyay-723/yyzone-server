var ajaxUtil = {
	/**
	 * 普通ajax请求
	 * @param  url 请求地址 
	 *         data post数据
	 *         callback 成功回调
	 */
	ajax: function(url, data, callback) {
		$.ajax({
			type: 'POST',
			url: url,
			data: data,
			dataType: 'json',
			success: function(data) {
				callback && callback(data);
			},
			error: function() {
				alert("通讯失败");
			}
		});
	}
}