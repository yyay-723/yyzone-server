//格式化时间
var $datetimeItems = $('.pro-datetime');

$.each($datetimeItems, function(i, item) {
	var $item = $(item);
	t = $.trim($item.text());
	$item.text(formatTime(t));
})

function formatTime(t) {
	var date = new Date(t / 1);
	var year = date.getFullYear();
	var month = date.getMonth();
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();
	Y = year + '-';
	M = (month + 1 < 10 ? '0' + (month + 1) : month + 1) + '-';
	D = (day < 10 ? '0' + day : day) + ' ';
	h = (hour < 10 ? '0' + hour : hour) + ':';
	m = (minute < 10 ? '0' + minute : minute) + ':';
	s = (second < 10 ? '0' + second : second);
	return (Y + M + D + h + m + s);
}