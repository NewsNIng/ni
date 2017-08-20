import Events from '../Public/Events.js'

/**
 * 5+ Broadcast.js by NewsNing 宁大大 
 */




let BroadCastNext = function () {
    const namespace = 'ni.Broadcast'


    // 获取当前webview
    const getIndexView = (() => {
            // 缓存
            let indexView = null
            return (update = false) => {
                if (update || indexView === null) {
                    indexView = plus.webview.currentWebview()
                }
                return indexView
            }
        })(),
        // 获取全部webview 
        getAllWebview = (() => {
            // 缓存
            let allView = null
            return (update = false) => {
                if (update || allView === null) {
                    allView = plus.webview.all()
                }
                return allView
            }
        })(),
        events = new Events()

    //页面通知类
    class Broadcast {
        /**
         * 构造器函数
         */
        constructor() {
        }

        /**
         * 事件监听
         * @param {String} eventName 事件名称
         * @param {Function} callback 事件触发后执行的回调函数
         */
        on(eventName, callback) {
            events.on(eventName, callback)
        }

        /**
         * 事件监听 (单次)
         * @param {String} eventName 事件名称
         * @param {Function} callback 事件触发后执行的回调函数
         */
        once(eventName, callback) {
           events.once(eventName, callback)
        }

        /**
         * 事件触发
         * @param {String} eventName 事件名称
         * @param {Object} data 传参参数值
         * @param {Object} options 其它配置参数
         */
        emit(eventName, data, {
            self = false, // 是否通知自己，默认不通知
            views = [], // 为空数组时，默认通知全部，为string数组时，认为是id，为object时，认为是webview对象
        } = {}) {
            let jsstr = `${namespace} && ${namespace}._emitSelf && ${namespace}._emitSelf('${eventName}', '${JSON.stringify(data)}')`
            this._sendMessage(jsstr, self, views)
        }

        /**
         * 当前页面事件触发 
         * @param {String} eventName 事件名称
         * @param {Object} data 传参参数值
         */
        emitSelf(eventName, data) {
            Broadcast._emitSelf(eventName, data)
        }

        /**
         * 事件关闭移除
         * @param {String} eventName 事件名称
         * @param {Object} options 其它配置参数
         */
        off(eventName, {
            self = false, // 是否通知自己，默认不通知
            views = [] // 为空数组时，默认通知全部，为string数组时，认为是id，为object时，认为是webview对象
        } = {}) {
            let jsstr = `${namespace} && ${namespace}._offSelf && ${namespace}._offSelf('${eventName}')`
            this._sendMessage(jsstr, self, views)
        }

        /**
         * 清空当前页面事件  
         * @param {String} eventName 事件名称
         */
        offSelf(eventName) {
            Broadcast._offSelf(eventName)
        }

        /**
         * 页面通知
         * @param {String} jsstr 需要运行的js代码
         * @param {Boolean} self 是否通知自己，默认不通知
         * @param {Array} views 为空数组时，默认通知全部，为string数组时，认为是id，为object时，认为是webview对象
         */
        _sendMessage(
            jsstr = '',
            self = false,
            views = []
        ) {
            let all = []
            // 获取 特定 webview 数组
            if (views.length > 0) {
                // 如果是string 类型，则统一处理获取为 webview对象
                all.map(item => typeof item === 'string' ? plus.webview.getWebviewById(item) : item)
            } else {
                // 不特定通知的webview数组时，直接获取全部已存在的webview
                all = getAllWebview(true)
            }
            // 如果不需要通知到当前webview 则过滤
            if (!self) {
                let v = getIndexView()
                all = all.filter(item => item.id !== v.id)
            }
            // 遍历全部页面
            for (let v of all) {
                v.evalJS(jsstr)
            }
        }

        static _emitSelf(eventName, data) {
            if (typeof data === 'string') {
                data = JSON.parse(data)
            }
            events.emit(eventName, data)
        }

        static _offSelf(eventName) {
            events.off(eventName)
        }

    }
    return Broadcast
}()



export default BroadCastNext