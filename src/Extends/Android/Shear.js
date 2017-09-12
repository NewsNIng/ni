// 导入安卓基类
import AndroidBase from './AndroidBase.js'

/**
 * 剪切板 类
 */
export default class Shear extends AndroidBase {
    constructor() {
		super()
    }

    deviceReady() {
		super.deviceReady()
        this.clip = this.MainActivity.getSystemService(this.Context.CLIPBOARD_SERVICE)
    }
    
    /**
     * 拷贝字符串
     * @param {String} str 
     */
    copy(str){
        plus.android.invoke(this.clip,"setText",str)
    }

    /**
     * 粘贴字符串
     * @return {String}
     */
    paste(){
        return plus.android.invoke(this.clip,"getText")
    }
}