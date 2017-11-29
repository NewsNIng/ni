import ning from '../index.js'

const VueNi = {}

VueNi.installed = false

VueNi.install = (Vue) => {
    if (VueNi.installed) {
        return
    }
    
    Vue.mixin({
        beforeCreate() {
            
        },
        mounted(){  
            if (ning.os.plus) {
                let pr = this.$options.plusReady
                if (pr && typeof pr === 'function') {
                    ning.plusReady(pr.bind(this))
                }
            }
        }
    })

    for (let key of Object.keys(ning)) {
        Vue.prototype[`$${key}`] = ning[key]
    }

    ning.plusReady(function(){
        Vue.prototype.$view = plus.webview.currentWebview()
        Vue.prototype.$close = plus.webview.currentWebview().close
        Vue.prototype.$hide = plus.webview.currentWebview().hide
    })

    VueNi.installed = true
}


if (typeof window !== 'undefined' && window.Vue) {
    window.ni = ning
    window.Vue.use(VueNi)
}

export default VueNi