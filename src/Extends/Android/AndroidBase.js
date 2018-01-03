import {
    plusReady
} from '../../Plus/Ready'

class AndroidBase {
    constructor() {
        plusReady(()=>{
            this.deviceReady()
        })
    }

    /**
     * 调用安卓原生时会要导入以下Class
     */
    deviceReady() {
        // 上下文
        this.Context = plus.android.importClass('android.content.Context')
        // 意图
        this.Intent = plus.android.importClass('android.content.Intent')
        // 主窗体
        this.MainActivity = plus.android.runtimeMainActivity()
        // 当前webview原生对象
        this.WebviewObject = plus.webview.currentWebview().nativeInstanceObject()
    }

	
	
}

export default  AndroidBase