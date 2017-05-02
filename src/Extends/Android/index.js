import SoftInput from './SoftInput.js'
import TelPhone from './TelPhone.js'
import TelPhone6 from './TelPhone.next.js'

const android = Object.create(null)

// 软键盘
android.SoftInput = SoftInput  
// 监听通话
android.TelPhone = TelPhone6 

module.exports = android