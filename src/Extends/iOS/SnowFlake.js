/**
 * iOS 网络请求通知栏雪花
 * by NewsNing
 * 2017-05-04
 */

import iOSBase from './iOSBase.js'

const UIApplication = null,
	  getSharedApplication = function(){
	  	return UIApplication && UIApplication.sharedApplication()
	  }

export default class SnowFlake extends iOSBase{
	constructor(){
		super()
	}
	
	//@overcover
	deviceReady(){
		// super.deviceReady()
		// 初始化开关为 关
		this.switch = false
		// 获取UIApplication
		UIApplication = plus.ios.import("UIApplication")
		
	}
	
	__changeSnowFlake(state){
		let sapp = getSharedApplication()
		if(sapp){
			sapp.setNetworkActivityIndicatorVisible(state)
			// 释放内存
			this.deleteNativeObj(sapp)
			this.switch = state
			sapp = null
		}
	}
	
	/**
	 * 显示网络请求雪花
	 */
	show(){
		this.__changeSnowFlake(true)
	}
	
	/**
	 * 隐藏网络请求雪花
	 */
	hide(){
		this.__changeSnowFlake(false)
	}
	
	/**
	 * 切换网络请求雪花
	 */
	toggle(){
		this.__changeSnowFlake(!this.switch)
	}
	
}


