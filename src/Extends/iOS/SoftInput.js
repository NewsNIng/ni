import iOSBase from './iOSBase.js'

/**
 * 软键盘
 */

class SoftInput extends iOSBase {
	constructor() {
		super()
	}

	deviceReady() {
		super.deviceReady()
	}

	/**
	 * 隐藏软键盘
	 */
	hide() {
		this._clearActiveElement()
		// 必须由用户交互才能唤起软键盘   的 开关  打开
		this.WebviewObject.plusCallMethod({
			"setKeyboardDisplayRequiresUserAction": true
		})
	}

	/**
	 * 显示软键盘
	 */
	show(inputElem, scroll = false) {
		// 必须由用户交互才能唤起软键盘   的 开关  关闭
		this.WebviewObject.plusCallMethod({
			"setKeyboardDisplayRequiresUserAction": false
		})
		if(inputElem) {
			if(this._isActiveElement(inputElem)) {
				// 如果当前元素已经在焦点状态，则认为已经被用户手动唤起软键盘
				return
			}
			this._setActiveElement(inputElem)
			scroll && setTimeout(function() {
				inputElem.scrollIntoView()
			}, 102)
			this.el = inputElem
		}

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

export default  SoftInput