// 导入安卓基类
import AndroidBase from './AndroidBase.js'
// 导入事件类
import Events from '../../Public/Events.js'
// 导入安卓通知类
import Receiver from './Receiver.js'
// 导入安卓拦截器类
import Filter from './Filter.js' 

/**
 * 电话监听
 */

const events = new Events()
	  //receiver = new Receiver(),
	  //filter = new Filter()

class TelPhone extends AndroidBase {
	constructor() {
		super()
	}

	deviceReady() {
		super.deviceReady()
		// 获取通话管理
		this.TelephonyManager = plus.android.importClass('android.telephony.TelephonyManager')
		// 添加拦截监听
		this.filter = new Filter()
		this.filter.addAction(this.TelephonyManager.ACTION_PHONE_STATE_CHANGED)
		// 注册服务监听
		this.receiver = new Receiver()
		this.receiver.registerReceiver(this.filter.getNativeObj(), (a, c, i) => {
			this._doReceive(c, i) //实现onReceiver回调函数
		})
		// 初始化
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