import ning from '../simple.js'

const VueNi = {}

VueNi.installed = false

VueNi.install = (Vue) => {
    if (VueNi.installed) {
        return
    }

    Vue.mixin({
        beforeCreate() {

        },
        mounted() {
            if (ning.os.plus) {
                let pr = this.$options.plusReady
                if (pr && typeof pr === 'function') {
                    ning.plusReady(pr.bind(this))
                }
            }
        }
    })

    var keys = Object.keys(ning);
    for(let i = 0, l = keys.length; i < l; i++){
        let key = keys[i];
        Vue.prototype[`$${key}`] = ning[key]
    }

    ning.plusReady(function () {
        Vue.prototype.$view = plus.webview.currentWebview()
        Vue.prototype.$close = plus.webview.currentWebview().close
        Vue.prototype.$hide = plus.webview.currentWebview().hide
    })

    VueNi.installed = true
}

if (typeof window !== 'undefined') {
    window.ni = ning;
    window.Vue && VueNi.install(window.Vue);
}


export default VueNi;


