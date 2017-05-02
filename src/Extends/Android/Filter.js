// Android 原生 拦截器

import AndroidBase from './AndroidBase.js'

export default class Filter extends AnroidBase {
	constructor(callback = () => {}) {
		super()
	}

	deviceReady() {
		//super.deviceReady()
		this._init()
	}
	
	_init(){
		this.filter = new plus.android.importClass('android.content.IntentFilter')()
	}
	
	/**
	 * 添加拦截条件
	 */
	addAction(intentActionType = ''){
		this.filter.addAction(intentActionType)
	}
	
	
	/**
	 * 获取该原生对象
	 */
	getNativeObj(){
		return this.filter
	}
	
}
