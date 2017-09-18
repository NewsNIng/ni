import ning from '../index.js'

const VueNi = {}

VueNi.installed = false

VueNi.install = (Vue) => {
    if (VueNi.installed) {
        return null;
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
    });

    for (let key of Object.keys(ning)) {
        Vue.prototype[`$${key}`] = ning[key]
    }



    Vue.prototype.$webview = Object.create(function(arr){
        const o = {};
        arr.forEach(item => {
            o[item] = function(...arg){
                return plus.webview.currentWebview()[item](...arg);
            }
        });
        return o;
    }(['close','hide']));
     

    VueNi.installed = true;
}


if (typeof window !== 'undefined' && window.Vue) {
    window.ni = ning
    window.Vue.use(VueNi)
}

export default VueNi