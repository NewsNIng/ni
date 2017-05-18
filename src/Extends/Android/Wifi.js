// 导入安卓基类
import AndroidBase from './AndroidBase.js'

export default class Wifi extends AndroidBase {
	
	constructor() {
		super()
	}
	
	deviceReady() {
		super.deviceReady()
		plus.android.importClass("android.net.wifi.WifiManager")
		plus.android.importClass("android.net.wifi.WifiInfo")
		
		this.wifiManager = this.MainActivity.getSystemService(this.Context.WIFI_SERVICE)
	}
	
	getSSID(){
		// 获取到的名称 是 带 双引号的 如 "cmcc"  
		// 所以我们这里处理一下
		var ssid = this.getInfo().getSSID()
		ssid = ssid.replace(/(^\"*)|(\"*$)/g, "")
		return ssid 
	}
	
	getInfo(){
		return this.wifiManager.getConnectionInfo()
	}
	
}

/**
 * 				// 主窗体
				var MainActivity = plus.android.runtimeMainActivity()
				// 上下文
        		var Context = plus.android.importClass('android.content.Context')
        		// 导入WIFI管理 和 WIFI 信息 的class
				plus.android.importClass("android.net.wifi.WifiManager")
				plus.android.importClass("android.net.wifi.WifiInfo")
				// 获取 WIFI 管理实例
				var wifiManager = MainActivity.getSystemService(Context.WIFI_SERVICE)
				
				// 获取当前连接WIFI的信息
				var info = wifiManager.getConnectionInfo()
				// 获取当前 WIFI 连接的 SSID (WIFI 名称)
				var name = info.getSSID()
 */
