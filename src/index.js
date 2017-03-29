//世界将以Ta为中心

import Broadcast from './Plus/Broadcast.low.js'
import Broadcast6 from './Plus/Broadcast.next.js'
import Share from './Plus/Share'
import OAuth from './Plus/OAuth'
import Gallery from './Plus/Gallery'
import Cache from './Plus/Cache'
import WebviewGroup from './Plus/WebviewGroup'
import WebviewGroupLow from './Plus/WebviewGroup.low.js'
import SliderMenu from './Plus/SliderMenu'
import Zip from './Plus/Zip'
import Download from './Plus/Download'
import Key from './Plus/Key'

import android from './Extends/Android/index.js'

import {
	ready,
	plusReady
} from './Plus/Ready'

const ning = Object.create(null)

// android 相关
ning.android = android

// ready
ning.ready = ready
ning.plusReady = plusReady
// 照片选取
ning.gallery = Gallery
// 键位处理
ning.key = new Key()

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
ning.Broadcast6 = Broadcast6

// 压缩处理
ning.Zip = Zip
// 文件下载
ning.Download = Download

if(window !== undefined){
	window.ni = ning
}

// ;(function(name,definition){
//     //检测上下文环境是否为AMD或CMD
//     var hasDefine = typeof define === 'function',
//         // 检测上下文环境是否为Node
//         hasExports = typeof module !== 'function' && module.exports;
//     if(hasDefine){
//         //AMD环境或CMD环境
//         define(definition);
// 		console.log(1)
//     }else if(hasExports){
//         //定义为普通Node模块
//         module.exports = definition();
// 		console.log(2)
//     }else{
// 		console.log(3)
//         //将模块的执行结果挂在window变量中，在浏览器中this指向window对象
//         this[name] = definition();
//     }

// })('ni',function(m){
// 	return ning
// })
