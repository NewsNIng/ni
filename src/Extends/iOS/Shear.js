import iOSBase from './iOSBase.js'


/**
 * 剪切板 类
 */
export default class Shear extends iOSBase {
    constructor() {
		super()
    }

    deviceReady() {
        super.deviceReady()
        this.UIPasteboard  = plus.ios.importClass("UIPasteboard")
        this.generalPasteboard = null
    }

    _getGeneralPasteboard(){
        if(this.generalPasteboard === null){
            this.generalPasteboard = this.UIPasteboard.generalPasteboard()
        }
        return this.generalPasteboard
    }
    _clearGeneralPasteboard(){
        if(this.generalPasteboard !== null){
            this.deleteNativeObj(this.generalPasteboard)
            this.generalPasteboard = null
        }
    }
    
    /**
     * 拷贝字符串
     * @param {String} str 
     */
    copy(str){
        let g = this._getGeneralPasteboard()
        g.plusCallMethod({setValue: str, forPasteboardType:"public.utf8-plain-text"})
        // g.setValueforPasteboardType(str, "public.utf8-plain-text")
        this._clearGeneralPasteboard()
        
    }

    /**
     * 粘贴字符串
     * @return {String}
     */
    paste(){
        let g = this._getGeneralPasteboard(),
        //value = g.valueForPasteboardType("public.utf8-plain-text")
        value =  g.plusCallMethod({valueForPasteboardType:"public.utf8-plain-text"})
        this._clearGeneralPasteboard()
        return value
    }
}