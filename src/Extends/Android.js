

class Android{
    constructor(){
        this._plusReadyInit()
    }


    addEventListener(listenName, listenCallBack){
        
    }

    removeEventListener(listenName, listenCallBack){

    }


    /**
     * 基本上调用安卓原生时会要导入以下Class
     */
    _plusReadyInit(){
        // 上下文
        this.Context = plus.android.importClass('android.content.Context')
        // 意图
        this.Intent = plus.android.importClass('android.content.Intent')
        // 主窗体
        this.MainActivity = plus.android.runtimeMainActivity()
    }

}