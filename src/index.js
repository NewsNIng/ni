//世界将以Ta为中心

import Broadcast from './Plus/Broadcast.low.js'
import OAuth from './Plus/OAuth'
import Gallery from './Plus/Gallery'
import Cache from './Plus/Cache'
import WebviewGroup from './Plus/WebviewGroup'
import WebviewGroupLow from './Plus/WebviewGroup.low.js'
import SliderMenu from './Plus/SliderMenu'
import Zip from './Plus/Zip'
import Download from './Plus/Download'

import {
	ready,
	plusReady
} from './Plus/Ready'
import Share from './Plus/Share'


const ning = Object.create(null)

// ready
ning.ready = ready
ning.plusReady = plusReady
// 照片选取
ning.gallery = Gallery



// 第三方授权登录
ning.OAuth = OAuth
// 第三方分享
ning.Share = Share
// 缓存
ning.Cache = Cache
// Webview容器
ning.WebviewGroup = WebviewGroup
// Webview容器 降级处理
ning.WebviewGroupLow = WebviewGroupLow
// 侧滑菜单
ning.SliderMenu = SliderMenu 
// 通知
ning.Broadcast = Broadcast
// 压缩处理
ning.Zip = Zip
// 文件下载
ning.Download = Download

if (typeof window !== 'undefined') {
	window.ni = ning
} 

(function(){
	var moduleName = ning
	if (typeof module !== 'undefined' && typeof exports === 'object' && define.cmd) {
		module.exports = moduleName
	} else if (typeof define === 'function' && define.amd) {
		define(function() { return moduleName; })
	} else {
		this.moduleName = moduleName
	}
}).call(function() {
	return this || (typeof window !== 'undefined' ? window : global)
})