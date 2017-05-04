import {
    plusReady
} from '../../Plus/Ready'

class iOSBase {
    constructor() {
        plusReady(()=>{
            this.deviceReady()
        })
    }

    deviceReady() {
        // 当前webview原生对象
        this.WebviewObject = plus.webview.currentWebview().nativeInstanceObject()
    }
    
    
    // 删除原生对象 释放内存
    deleteNativeObj(nativeObj){
    	plus.ios.deleteObject(nativeObj)
    }


}

module.exports = iOSBase