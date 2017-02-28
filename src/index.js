//世界将以Ta为中心

import Broadcast from './Plus/Broadcast'
import OAuth from './Plus/OAuth'
import Gallery from './Plus/Gallery'
import Cache from './Plus/Cache'
import {
	ready,
	plusReady
} from './Plus/Ready'
import Share from './Plus/Share'


const ning = Object.create(null)

// ready
ning.ready = ready
ning.plusReady = plusReady
// 通知
ning.broadcast = new Broadcast()
// 照片选取
ning.gallery = Gallery


// 第三方授权登录
ning.OAuth = OAuth
// 第三分分享
ning.Share = Share
// 缓存
ning.Cache = Cache

console.log(Share)

if (typeof window !== 'undefined') {
	window.ni = ning
}