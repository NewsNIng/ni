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


}

module.exports = iOSBase