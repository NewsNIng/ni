// 导入安卓基类
import AndroidBase from './AndroidBase.js'

export default class Wifi extends AndroidBase {

	constructor() {
		super()
	}

	deviceReady() {
		super.deviceReady()
		// 导入WIFI管理 和 WIFI 信息 的class
		plus.android.importClass("android.net.wifi.WifiManager")
		plus.android.importClass("android.net.wifi.WifiInfo")
		// 导入WIFI 列表管理 相关 class
		plus.android.importClass("android.net.wifi.ScanResult")
		plus.android.importClass("java.util.ArrayList")
		this.wifiManager = this.MainActivity.getSystemService(this.Context.WIFI_SERVICE)
	}

	getSSID() {
		// 获取到的名称 是 带 双引号的 如 "cmcc"  
		// 所以我们这里处理一下
		var ssid = this.getInfo().getSSID()
		ssid = ssid.replace(/(^\"*)|(\"*$)/g, "")
		return ssid
	}

	getInfo() {
		return this.wifiManager.getConnectionInfo()
	}

	/**
	 * 获取附近的所有WIFI列表
	 */
	getAllList() {
		let resultList = this.wifiManager.getScanResults()
		return this.__resultArrayList2JsArray(resultList,[
			'SSID',
			'level'
		])
	}

	/**
	 * 转换
	 */
	__resultArrayList2JsArray(r, q = [
		'BSSID', // 访问点的地址。
		'SSID', // 网络名称。
		'capabilities', // 描述了身份验证、密钥管理和访问点支持的加密方案。
		'centerFreq0', // 不习惯如果美联社20 MHz带宽是美联社使用40,80或160兆赫,这是中心频率(MHz)如果美联社用80 + 80兆赫,这是第一部分的中心频率(MHz)
		'centerFreq1', // 只使用如果美联社带宽是80 + 80 MHz如果美联社用80 + 80 MHz,这是第二段的中心频率(MHz)
		'channelWidth', // 美联社通道带宽;之一 CHANNEL_WIDTH_20MHZ, CHANNEL_WIDTH_40MHZ, CHANNEL_WIDTH_80MHZ, CHANNEL_WIDTH_160MHZ或CHANNEL_WIDTH_80MHZ_PLUS_MHZ.
		'frequency', // 主20 MHz的频率(MHz)的渠道客户交流访问点。
		'level', // dBm的检测信号电平,也被称为RSSI。
		'operatorFriendlyName', // 表明passpoint运营商发布的接入点名称。
		'timestamp', // 时间戳在微秒(因为)这个结果最后被看见。
		'venueName', // 表示地点名称(如“旧金山机场”)发布的接入点;只有passpoint网络如果发表的接入点。
	]) {
		let arr = [],
			len = r.size()
		for(let i = 0; i < len; i++) {
			arr.push(q.reduce(function(obj, attr) {
				obj[attr] = obj.nativeObj.plusGetAttribute(attr)
				return obj
			}, {
				nativeObj: r.get(i)
			}))
		}
		return arr
	}

}

