// Android 原生 系统广播 监听器
import AndroidBase from './AndroidBase.js'

export default class Receiver extends AnroidBase {

	constructor(callback = () => {}) {
		super()
		this.receiver = null
		this.receiveFn = callback
	}

	deviceReady() {
		super.deviceReady()
		this._init()
	}
	
	
	/**
	 * 添加监听
	 * @param {IntentFilter} 安卓原生拦截器
	 * @param {Function} 回调函数
	 */
	registerReceiver(filter = null, callback){
		this.receiver && this.MainActivity.registerReceiver(this.receiver, filter)
		if(typeof callback === 'function'){
			this.receiverFn = callback
		}
		return this
	}
	
	/**
	 * 取消监听
	 */
	unregisterReceiver(){
		this.receiver && this.MainActivity.unregisterReceiver(this.receiver)
		return this
	}
	
	
	/**
	 * 获取该原生对象
	 */
	getNativeObj(){
		return this.receiver
	}
	
	_init() {
		this.receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
			onReceive: function(c, i){
				this._doReceive(c, i) // 实现onReceiver回调函数
			}.bind(this)
		})
	}

	_doReceive(context, intent) {
		plus.android.importClass(intent) // 通过intent实例引入intent类，方便以后的‘.’操作
		this.receiverFn(intent.getAction(), context, intent)
		return this
	}
}