/**
 * 事件处理类
 */

let Events_ = function () {
    // 事件列表
    const events = {}
    // 单次事件列表
    const events_one = {}


    class Events {
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
         */
        emit(eventName, data = {}) {
            // 获取全部事件列表 和 单次事件列表，并且合并
            let es = [...(events[eventName] || []), ...(events_one[eventName] || [])]
            // 遍历触发
            // for (let f of es) {
            //     f && f.call(f, data)
            // }
            for(let i = 0, l = es.length; i < l; i++){
                let f = es[i]
                f && f.call(f, data)
            }
            // 单次事件清空
            events_one[eventName] = []
        }

        /**
         * 清空当前页面事件  
         * @param {String} eventName 事件名称
         */
        off(eventName) {
            //清空事件列表
            events[eventName] = []
            events_one[eventName] = []
        }

        /**
         * 移除页面单次事件
         * @param {String} eventName 事件名称
         */
        offOnce(eventName){
            events_one[eventName] = []
        }

        getEvents(eventName){
            return {events: events[eventName], events_one: events_one[eventName]}
        }

    }

    return Events
}()

export default  Events_