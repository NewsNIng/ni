// 侧滑菜单
// 纵享丝滑

class SliderMenu {
    constructor({
        url = '',
        id = url,
        extras = {}
    } = {}) {
        this.isShow = false
        this.options = {
            url,
            id,
            extras
        }
        this.createMenu()
        this._initEvent()
    }

    show() {
        plus.webview.startAnimation({
            view: this.menuv,
            styles: {
                fromLeft: "-70%",
                toLeft: "0"
            }
        }, {
            view: this.indexv,
            styles: {
                fromLeft: "0",
                toLeft: "70%"
            }
        });
        this._onend({
            progress: '100',
            direction: 'right'
        })
    }
    hide() {
        plus.webview.startAnimation({
            view: this.menuv,
            styles: {
                fromLeft: "0",
                toLeft: "-70%"
            }
        }, {
            view: this.indexv,
            styles: {
                fromLeft: "70%",
                toLeft: "0"
            }
        });
        this._onend({
            progress: '100',
            direction: 'left'
        })
    }

    // 创建菜单
    createMenu() {
        this.menuv = plus.webview.create(this.options.url, this.options.id, {
            left: "-70%",
            width: '70%',
            popGesture: "none",
            render: "always",
            // zindex: -1
        }, this.options.extras)
        this.indexv = plus.webview.currentWebview()
    }



    // 初始化
    _initEvent() {

        this.menuv.addEventListener('titleUpdate', () => {
            this.menuv.show('none')

            this.indexv.drag({
                direction: 'right',
                moveMode: 'followFinger'
            }, {
                view: this.menuv,
                moveMode: 'follow'
            }, e => {
                let methodName = '_on' + e.type
                this[methodName] && this[methodName](e)
            })

            this.menuv.drag({
                direction: "left",
                moveMode: "followFinger"
            }, {
                view: this.indexv,
                moveMode: "follow"
            }, e => {
                let methodName = '_on' + e.type
                this[methodName] && this[methodName](e)
            })

        })

        this.indexv.addEventListener('maskClick', e => {
            this.hide()
        })

    }

    // _onmove(){}
    // _onstart(){}


    // 页面滑动结束时
    _onend(e) {
        if (e.progress !== '100') {
            return
        }
        let mask = 'rgba(0,0,0,0.15)',
            isShow = true
        if (e.direction === 'left') {
            mask = 'none'
            isShow = false
        }
        this.indexv.setStyle({
            mask
        })
        this.isShow = isShow
    }

}


module.exports = SliderMenu