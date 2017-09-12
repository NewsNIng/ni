import SoftInput from './SoftInput.js'
import SnowFlake from './SnowFlake.js'
import Shear from './Shear.js'

const ios = Object.create(null)

// 软键盘
ios.SoftInput = SoftInput
// 请求网络通知栏雪花
ios.SnowFlake = SnowFlake
// 剪切板管理
ios.Shear = Shear

module.exports = ios