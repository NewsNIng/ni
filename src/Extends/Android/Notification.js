import AndroidBase from './AndroidBase.js'

/**
 * 安卓原生通知栏
 */

let __id = 1000

export default class Notification extends AndroidBase {
	constructor() {
		super()
		
	}

	deviceReady() {
		super.deviceReady()

		// 获取状态通知栏管理
		this.NotifyManager = this.MainActivity.getSystemService(this.Context.NOTIFICATION_SERVICE)
		// 兼容低版本
		let packName = +(+(plus.os.version.replace(/\./g, ''))*100).toString().substr(0, 3) > 411 ? 'android.app.Notification' : 'android.support.v4.app.NotificationCompat'
		this.Notification = plus.android.importClass(packName)
		// 实例化通知栏构造器NotificationCompat.Builder
		this.NotificationBuild = new this.Notification.Builder(this.MainActivity)
		// 对Builder进行配置
		
		//是否 常驻状态栏 默认设为true
		this.NotificationBuild.setOngoing(false)
		//标题
		//this.NotificationBuild.setContentTitle("")
		//内容
		//this.NotificationBuild.setContentText("")
		//提示
		//this.NotificationBuild.setTicker("")
		//数目
		//this.NotificationBuild.setNumber("")
		//图标
		this.NotificationBuild.setSmallIcon(17301620)
		//声音
		//this.NotificationBuild.setDefaults(plus.android.importClass("android.app.Notification").DEFAULT_SOUND)
		//this.voice = true
		this.setVoice(true)
	}
	
	// 设置是否显示声音
	setVoice(_voice){
		if(_voice !== this.voice){
			//声音
			this.voice = _voice
			this.NotificationBuild.setDefaults(_voice? plus.android.importClass("android.app.Notification").DEFAULT_SOUND : 0)
		}
	}
	
	

	// 显示一个通知
	showMessage({
		title = '标题', // 标题
		content = '内容', // 内容
		tips = '提示', // 提示
		
		voice = false, // 是否播放声音
		
		id = __id ++, // 通知id  必须为number
	} = {}) {
		id = +id
		
		//标题
		this.NotificationBuild.setContentTitle(title)
		//内容
		this.NotificationBuild.setContentText(content)
		//提示
		this.NotificationBuild.setTicker(tips)
		//声音
		this.NotificationBuild.setDefaults(voice? plus.android.importClass("android.app.Notification").DEFAULT_SOUND : 0)
		
		// 展示在通知栏
		this.NotifyManager.notify(id, this.NotificationBuild.build())

		return id
	}

	// 显示一个进度条
	showProgress() {}

	// 删除一个通知/进度条
	remove(ntid) {
		// 不传id 默认删除栈顶
		ntid = +ntid || --__id 
		this.NotifyManager.cancel(ntid)
	}

	// 删除全部通知/进度条
	clear() {
		this.NotifyManager.cancelAll()
	}

	// 
}