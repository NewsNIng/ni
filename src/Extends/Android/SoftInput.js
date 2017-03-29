import AndroidBase from './AndroidBase.js'

/**
 * 软键盘
 */

class SoftInput extends AndroidBase {
    constructor() {
        super()
    }

    deviceReady(){
        super.deviceReady()
        this.InputMethodManager = plus.android.importClass("android.view.inputmethod.InputMethodManager")
        this.imm = this.MainActivity.getSystemService(this.Context.INPUT_METHOD_SERVICE)
        plus.android.importClass(this.WebviewObject)
        this.el = null
    }


    /**
     * 隐藏软键盘
     */
    hide() {
        this._clearActiveElement()
        this.imm.hideSoftInputFromWindow(this.WebviewObject.getWindowToken(), 0)
    }

    /**
     * 显示软键盘
     */
    show(inputElem) {
        if (inputElem) {
            if (this._isActiveElement(inputElem)) {
                // 如果当前元素已经在焦点状态，则认为已经被用户手动唤起软键盘
                return
            }
            this.WebviewObject.requestFocusFromTouch()
            this._setActiveElement(inputElem)
            setTimeout(function () {
                inputElem.scrollIntoView()
            }, 500)
            this.el = inputElem
        }

        this.imm.showSoftInput(this.WebviewObject, this.InputMethodManager.SHOW_FORCED)
    }

    _getActiveElement() {
        return document.activeElement
    }

    _isActiveElement(el) {
        return el === this._getActiveElement()
    }

    _setActiveElement(el) {
        el && el.focus()
    }

    _clearActiveElement() {
        var el = this._getActiveElement()
        el && el.blur()
    }



}


module.exports = SoftInput