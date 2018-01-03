let webviewGroup = (function () {
  const _webviews = {}
  let activeId 

  class WebviewGroup {

    constructor(id, {
      items = [],
      index = 0,
      onChange
    }, {
      showWaiting = false
    } = {}) {
      onChange = onChange || function () {}

      this.id = id
      this.options = {
        items,
        index,
        onChange
      }
      this.other = {
        showWaiting
      }
      this.items = items;
      this.onChange = onChange

      this._init()
    }

    // 初始化
    _init() {
      this._initParent()
      this._initWebviewContexts()
    }

    // 初始化父窗体
    _initParent() {
      this.parent = plus.webview.getWebviewById(this.id);
      if (!this.parent) {
        this.parent = plus.webview.create(this.id, this.id, {render: 'always'})
        this.parent.show('none')
      }

    }

    // 初始化子页
    _initWebviewContexts() {
      let temp = null
      for(let i in this.items){
        temp = this.items[i]
        temp.index = +i
        _webviews[temp.id] = temp
        if(this.options.index === +i){
          this.switchTab(temp.id) 
        }
      }
      
    }


    switchTab(id) {
      let o = _webviews[id]
      id = o.id 
      let w = plus.webview.getWebviewById(id),
          type = "none"
      if (!w) {
        w = plus.webview.create(o.url, id, o.styles, o.extras)
        w.hide()
        this.parent.append(w)
        type = "fade-in"
      }else if(w.isVisible()){
        return
      }
      w.show(type, plus.os.ios ? 300 : 500)
      activeId && plus.webview.hide(activeId)
      activeId = id
      this.onChange({index: o.index})

    }


  }

  return WebviewGroup
 

})()


export default  webviewGroup