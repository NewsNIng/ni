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

import os from './Public/OS.js'

import android from './Extends/Android/index.js'
import ios from './Extends/iOS/index.js'

import {
	ready,
	plusReady
} from './Plus/Ready'

const ning = Object.create(null)

// os 
ning.os = os

// android 相关
ning.os.android && (ning.android = android)

// ios 相关
ning.os.ios && (ning.ios = ios)

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




/**
 * 双击退出
 * @param {String} message 提示语
 * @param {Number} dely 逻辑间隔 单位：秒
 * @param {Boolean} hide 改为返回到桌面（后台）
 */
ning.doubleBack = function(message = '再按一次退出', dely = 1000, hide = false){
	ning.key.overcover('backbutton', function() {
		let k = false,
			t = null,
			main = null
		return function(e) {
			if(!t) {
				plus.nativeUI.toast(message)
				t = setTimeout(function() {
					t = null
					k = false
				}, dely)
				k = true
			} else if(k) {
				
				if(hide){ // 如果是返回到桌面模式
					if(!main){
						main = plus.android.runtimeMainActivity()
					}
					main.moveTaskToBack(false)
				}else{
					plus.runtime.quit()
				}
			}
	
		}
	
	}())
}

//自定义重写返回键
ning.back = function(func){
	ning.key.overcover('backbutton', func)
}


if(window !== undefined){
	window.ni = ning
}
