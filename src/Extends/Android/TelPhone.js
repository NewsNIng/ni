// 导入安卓基类
import AndroidBase from './AndroidBase.js'
// 导入事件类
import Events from '../../Public/Events.js'

/**
 * 电话监听
 */

const events = new Events()

class TelPhone extends AndroidBase {
	constructor() {
		super()
	}

	deviceReady() {
		super.deviceReady()
		// 获取通话管理
		this.TelephonyManager = plus.android.importClass('android.telephony.TelephonyManager')
		this.receiver = plus.android.implements('io.dcloud.feature.internal.reflect.BroadcastReceiver', {
			onReceive: function(c, i){
				this._doReceive(c, i) //实现onReceiver回调函数
			}.bind(this)
		})
		this.IntentFilter = plus.android.importClass('android.content.IntentFilter')
		this.filter = new this.IntentFilter()
		//监听电话状态
		this.filter.addAction(this.TelephonyManager.ACTION_PHONE_STATE_CHANGED)
		//注册监听
		this.MainActivity.registerReceiver(this.receiver, this.filter)
		this._init()
	}

	_init() {
		// 事件列表
		this.types = {
			[this.TelephonyManager.CALL_STATE_RINGING]: 'wait', // 等待接取电话
			[this.TelephonyManager.CALL_STATE_IDLE]: 'die', // 电话挂断
			[this.TelephonyManager.CALL_STATE_OFFHOOK]: 'way', // 通话中
		}
	}

	/**
	 * 事件监听
	 * @param {String} eventName 事件名称
	 * @param {Function} callback 事件触发后执行的回调函数
	 */
	on(eventName, callback) {
		events.on(eventName, callback)
		return this
	}

	_doReceive(context, intent) {
		plus.android.importClass(intent)
		let phoneNumber = intent.getStringExtra(this.TelephonyManager.EXTRA_INCOMING_NUMBER),
			telephony = context.getSystemService(context.TELEPHONY_SERVICE),
			state = telephony.getCallState()
		   
		events.emit(this.types[state], phoneNumber)

	}

}

export default TelPhone