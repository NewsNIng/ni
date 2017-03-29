/**
 * 5+ Broadcast.js by NewsNing 宁大大 
 */


let BroadCastNext = function () {
    const namespace = 'ni.Broadcast6'


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
        })()

    // 事件列表
    const events = {

        },
        // 单次事件列表
        events_one = {

        }

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
            // 获取已存在的事件列表
            if (!events[eventName]) {
                events[eventName] = []
            }
            // 添加至数组
            events[eventName].push(callback)
        }

        /**
         * 事件监听 (单次)
         * @param {String} eventName 事件名称
         * @param {Function} callback 事件触发后执行的回调函数
         */
        once(eventName, callback) {
            // 获取已存在的单次事件列表
            if (!events_one[eventName]) {
                events_one[eventName] = []
            }
            // 添加至数组
            events_one[eventName].push(callback)
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
        emitSelf(eventName) {
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
            // 获取全部事件列表 和 单次事件列表，并且合并
            let es = [...(events[eventName] || []), ...(events_one[eventName] || [])]
            // 遍历触发
            for (let f of es) {
                f && f.call(f, data)
            }
            // 单次事件清空
            events_one[eventName] = []
        }

        static _offSelf(eventName) {
            //清空事件列表
            events[eventName] = []
            events_one[eventName] = []
        }

    }
    return Broadcast
}()



export default BroadCastNext