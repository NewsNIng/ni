import ning from '../simple.js'

const VueNi = {}



VueNi.installed = false

VueNi.install = (Vue) => {
    if (VueNi.installed) {
        return
    }

    const VuePlusReadyFn = _ => {
        Vue.prototype.$view = plus.webview.currentWebview()
        Vue.prototype.$close = plus.webview.currentWebview().close
        Vue.prototype.$hide = plus.webview.currentWebview().hide
    }

    Vue.mixin({
        beforeCreate() { 

        },
        mounted() {
            let pr = this.$options.plusReady
            if (pr && typeof pr === 'function') {
                if (window.plus) {
                    pr.call(this)
                    VuePlusReadyFn();
                } else {
                    ning.plusReady(pr.bind(this))
                    ning.plusReady(VuePlusReadyFn())
                }
                
            }
            

        }
    })

    var keys = Object.keys(ning);
    for (let i = 0, l = keys.length; i < l; i++) {
        let key = keys[i];
        Vue.prototype[`$${key}`] = ning[key]
    }
    
    VueNi.installed = true
}

if (typeof window !== 'undefined') {
    window.ni = ning;
    window.Vue && VueNi.install(window.Vue);
}


export default VueNi;