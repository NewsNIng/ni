import SoftInput from './SoftInput.js'
import TelPhone from './TelPhone.js'
import TelPhone6 from './TelPhone.next.js'
import Notification from './Notification.js'
import Wifi from './Wifi.js'
import Shear from './Shear.js'

const android = Object.create(null)

// 软键盘
android.SoftInput = SoftInput  
// 监听通话
android.TelPhone = TelPhone6 
// 通知
android.Notification = Notification
// Wifi 管理
android.Wifi = Wifi
// 剪切板管理
android.Shear = Shear

module.exports = android