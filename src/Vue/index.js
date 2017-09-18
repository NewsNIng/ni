import ning from '../index.js'

const VueNi = {}

VueNi.installed = false

VueNi.install = (Vue) => {
    if (VueNi.installed) {
        return
    }

    Vue.mixin({
        beforeCreate() {
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

    Vue.prototype.$close = plus.webview.currentWebview().close
    Vue.prototype.$hide = plus.webview.currentWebview().hide
    // Vue.directive('ni-back', {
    //     bind(el, binding, vnode, oldVnode) {
            
    //     }
    // })


    VueNi.installed = true
}


if (typeof window !== 'undefined' && window.Vue) {
    window.ni = ning
    window.Vue.use(VueNi)
}

export default VueNi