import SoftInput from './SoftInput.js'
import SnowFlake from './SnowFlake.js'


const ios = Object.create(null)

// 软键盘
ios.SoftInput = SoftInput
// 请求网络通知栏雪花
ios.SnowFlake = SnowFlake


module.exports = ios