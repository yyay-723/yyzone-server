require.config({

	paths: {
		"jquery": "/js/utils/jquery-1.8.3.min",
		"ajax": "/js/utils/myAjax",
		"common": "/js/common",
		"ueditor_config": "/ueditor/ueditor.config",
		"ueditor": "/ueditor/ueditor.all",
		"ueditor_zh_cn": "/ueditor/lang/zh-cn/zh-cn"
	},
	shim: {
		"ueditor": {
			deps: ['/ueditor/ueditor.config.js']
//			exports: "UE"
		},
		"ueditor_zh_cn": {
			deps: ["ueditor"]
		}
	}
//	window.UEDITOR_HOME_URL : "/ueditor/"
})