import SoftInput from './SoftInput.js'
import TelPhone from './TelPhone.js'


const android = Object.create(null)

// 软键盘
android.SoftInput = SoftInput
// 监听通话
android.TelPhone = TelPhone 

module.exports = android