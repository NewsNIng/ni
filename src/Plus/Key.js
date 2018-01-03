import Events from '../Public/Events.js'

// 按键
// 慢慢，慢慢，消散


// 事件列表
// const keyEvents = {
//     backbutton: [], // 设备“返回”按钮按键事件 *
//     keydown: [], // 键按下事件
//     keyup: [], // 键松开事件
//     longpressed: [], // 长按键事件
//     menubutton: [], //设备“菜单”按钮按键事件 * 
//     searchbutton: [], // 设备“搜索”按钮按键事件
//     volumeupbutton: [], // 设备“音量+”按钮按键事件
//     volumedownbutton: [], // 设备“音量-”按钮按键事件
// }


const eventsStore = new Events()

class Key{
    constructor(){}

    // 监听事件
    on(keyEventName, eventBack){
        eventsStore.on(keyEventName, eventBack)
        plus.key.addEventListener(keyEventName, eventBack)
    }


    // 监听一次事件
    once(keyEventName, eventBack){
        let fn = function (...arg){
            eventBack.call(eventBack, ...arg)
            plus.key.removeEventListener(keyEventName, fn)
        }
        eventsStore.once(keyEventName, fn)
        plus.key.addEventListener(keyEventName, fn)
    }

    // 移除事件
    off(keyEventName){
        let {events, events_one} = eventsStore.getEvents(keyEventName)
        events = [...(events || []), ...(events_one || [])]
        events.map((item) => {
            plus.key.removeEventListener(keyEventName, item)
        })
        eventsStore.off(keyEventName)
        events = null
        events_one = null
    }

    // 触发事件
    emit(keyEventName){
        let {events_one} = eventsStore.getEvents(keyEventName)
        events_one.map((item) => {
            plus.key.removeEventListener(keyEventName, item)
        })
        eventsStore.emit()
        events_one = null

    }

    // 重写事件
    overcover(keyEventName, eventBack){
        this.off(keyEventName)
        this.on(keyEventName, eventBack)
    }

    
    
}

export default  Key
