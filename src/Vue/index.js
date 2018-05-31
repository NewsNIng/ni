import ning from '../index.js'

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
                    VuePlusReadyFn();
                    pr.call(this)
                } else {
                    ning.plusReady(VuePlusReadyFn) 
                    ning.plusReady(pr.bind(this))  
                } 
                
            }
            

        }
    })

    // 注册一个全局自定义指令 沉浸式 `v-immersed`
    Vue.directive('immersed', {
        inserted: function (el) {
            var immersed = 0;
            if(window.immersed === undefined){
                var ms = (/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
                if(ms && ms.length >= 3) {
                    immersed = parseFloat(ms[2]);
                }
                window.immersed = immersed || 0;
            }else{
                immersed = window.immersed;
            }
            if(!immersed) {
                return;
            }
            el.style.paddingTop = immersed + 'px';
            el.style.height = el.offsetHeight + immersed + 'px';
            
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