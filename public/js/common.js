var globalObj = globalObj || {};
   globalObj = $.extend(globalObj, {
	gId : function(d){
		return document.getElementById(d); 
	} 
});