// 按键
// 慢慢，慢慢，消散


// 事件列表
const keyEvents = {
    backbutton: [], // 设备“返回”按钮按键事件 *
    keydown: [], // 键按下事件
    keyup: [], // 键松开事件
    longpressed: [], // 长按键事件
    menubutton: [], //设备“菜单”按钮按键事件 * 
    searchbutton: [], // 设备“搜索”按钮按键事件
    volumeupbutton: [], // 设备“音量+”按钮按键事件
    volumedownbutton: [], // 设备“音量-”按钮按键事件
},
// 单次事件列表
keyEventOnces = {
    backbutton: [], // 设备“返回”按钮按键事件 *
    keydown: [], // 键按下事件
    keyup: [], // 键松开事件
    longpressed: [], // 长按键事件
    menubutton: [], //设备“菜单”按钮按键事件 * 
    searchbutton: [], // 设备“搜索”按钮按键事件
    volumeupbutton: [], // 设备“音量+”按钮按键事件
    volumedownbutton: [], // 设备“音量-”按钮按键事件
}



class Key{
    constructor(){}

    // 监听事件
    listen(keyEventName, eventBack){
        keyEvents[keyEventName].push(eventBack)
        plus.key.addEventListener(keyEventName, (...arg) => {
            eventBack.call(eventBack, ...arg)
        })
    }

    // 监听一次事件
    once(keyEventName, eventBack){
        keyEventOnces[keyEventName].push(eventBack)
        plus.key.addEventListener(keyEventName, (...arg) => {
            eventBack.call(eventBack, ...arg)
            // 触发后置空
            keyEventOnces[keyEventName] = []
        })
    }

    // 移除事件
    remove(keyEventName){
        keyEvents[keyEventName].map((item) => {
            plus.key.removeEventListener(keyEventName, item)
        })
        keyEventOnces[keyEventName].map((item) => {
            plus.key.removeEventListener(keyEventName, item)
        })
        // 事件置空
        keyEvents[keyEventName] = []
        // 单次事件置空
        keyEventOnces[keyEventName] = []
        
    }

    // 触发事件
    trigger(keyEventName){
        keyEvents[keyEventName].map((item) => {
            item.call(item,{})
        })
        keyEventOnces[keyEventName].map((item) => {
            // 去除设备的触发事件
            plus.key.removeEventListener(keyEventName, item)
            // 主动触发
            item.call(item,{})
        })
        // 单次事件置空
        keyEventOnces[keyEventName] = []

    }

    // 重写事件
    overcover(keyEventName, eventBack){
        this.remove(keyEventName)
        this.listen(keyEventName, eventBack)
    }

    
    
}

module.exports = Key
