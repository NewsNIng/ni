/*! ni v0.0.1 by NewsNing */
!function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(1)},function(e,t,n){var i;(function(r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s=n(2),u=o(s),l=n(3),c=o(l),f=n(4),v=o(f),h=n(5),p=o(h),d=n(6),w=o(d),y=n(7),g=o(y),_=n(8),b=o(_),m=n(9),k=o(m),x=n(10),C=n(11),S=o(C),W=Object.create(null);W.ready=x.ready,W.plusReady=x.plusReady,W.gallery=v.default,W.OAuth=c.default,W.Share=S.default,W.Cache=p.default,W.WebviewGroup=w.default,W.WebviewGroupLow=g.default,W.SliderMenu=b.default,W.Broadcast=u.default,W.Zip=k.default,"undefined"!=typeof window&&(window.ni=W),function(){var r=W;"undefined"!=typeof e&&"object"===a(t)&&n(12).cmd?e.exports=r:(i=function(){return r}.call(t,n,t,e),!(void 0!==i&&(e.exports=i)))}.call(function(){return this||("undefined"!=typeof window?window:r)})}).call(t,function(){return this}())},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){var e=void 0,t=void 0,r=void 0,o=function(){function o(){n(this,o),this.newState=!0,r={}}return i(o,[{key:"send",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=n.self,r=void 0!==i&&i,o=n.ids,a=void 0===o?[]:o;if(window.plus){var s=void 0;if(a.length>0){s=[];var u=!0,l=!1,c=void 0;try{for(var f,v=a[Symbol.iterator]();!(u=(f=v.next()).done);u=!0){var h=f.value,p=plus.webview.getWebviewById(h);p&&s.push(p)}}catch(e){l=!0,c=e}finally{try{!u&&v.return&&v.return()}finally{if(l)throw c}}}else s=this._getViews();var d=!0,w=!1,y=void 0;try{for(var g,_=s[Symbol.iterator]();!(d=(g=_.next()).done);d=!0){var b=g.value;(b.id!=this._getIndexID()||r)&&b.evalJS("document.dispatchEvent(new CustomEvent('"+e+"', {\n                detail:JSON.parse('"+JSON.stringify(t)+"'),\n                bubbles: true,\n                cancelable: true\n            }));")}}catch(e){w=!0,y=e}finally{try{!d&&_.return&&_.return()}finally{if(w)throw y}}}}},{key:"remove",value:function(e){var t=r[e];if(!t||!t.length)return!1;var n=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done);n=!0){var u=a.value;document.removeEventListener(e,u)}}catch(e){i=!0,o=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw o}}return!0}},{key:"listen",value:function(e,t){var n=r,i=function(e){return t&&t.call(t,e.detail)};return n[e]||(n[e]=[]),n[e].push(i),document.addEventListener(e,i),this}},{key:"_getViews",value:function(){return!this.newState&&e||(e=plus.webview.all()),e}},{key:"_getIndexID",value:function(){return t||(t=plus.webview.currentWebview().id),t}}]),o}();return o}();t.default=r},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(t,i){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i;n(this,e),this.auths=null,this.type=t,this.OAuthCallBack=function(){return i.apply(r,arguments)},this.start()}return i(e,[{key:"start",value:function(){var e=this;this.getService(this.type,function(t){e.getOAuthInfo(t,function(){e.OAuthCallBack(null,t)})})}},{key:"getOAuthInfo",value:function(e,t){var n=this,i=arguments;this._OAuthLogin(e,function(){e.getUserInfo(function(){t&&t(e)},function(){return n.OAuthCallBack.apply(null,i)})})}},{key:"_OAuthLogin",value:function(e,t){var n=this,i=arguments;e.authResult?t&&t():e.login(function(){t&&t()},function(){return n.OAuthCallBack.apply(null,i)})}},{key:"_getService",value:function(e,t){for(var n in this.auths)if(e===this.auths[n].id)return t&&t(this.auths[n]),this.auths[n]}},{key:"getService",value:function(e,t){var n=this,i=arguments;return null===this.auths?this._getHtml5PlusServices(function(r,o){return r?n.OAuthCallBack.apply(null,i):(n.auths=o,void n._getService(e,t))}):void this._getService(e,t)}},{key:"_getHtml5PlusServices",value:function(e){plus.oauth.getServices(function(t){e(null,t)},function(t){e(t,null)})}}]),e}();t.default=r},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){plus.nativeUI.actionSheet({cancel:"取消",buttons:[{title:"照相机",style:"destructive"},{title:"最近相片"},{title:"相册"}]},function(n){var i=n.index;if(0!==i)if(i--,0===i){var r=plus.camera.getCamera();r.captureImage(function(t){plus.io.resolveLocalFileSystemURL(t,function(t){var n=t.name,i=t.toLocalURL();e&&e(null,[i],[n])},function(t){e&&e(t.message)})},function(t){e&&e(t.message)},{filename:"_doc/camera/",index:1})}else{var o=!1;2===i&&(o=!0),plus.gallery.pick(function(n){if(t){for(var i=[],r=0;r<n.files.length;r++)i.push(n.files[r]);n=i}e&&e(null,n)},function(t){e&&e(t.message)},{filter:"image",multiple:!!t,system:o,maximum:t,onmaxed:function(){plus.nativeUI.toast("您最多能选择"+t+"张")}})}})};t.default=n},function(module,exports){"use strict";function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),Cache=function(){var CacheBase=function(){function CacheBase(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"__this_is_cache_key_",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},i=n.plus,r=void 0!==i&&i;_classCallCheck(this,CacheBase),this.key=e,this.plus=r,null===this.get()&&this.set(t)}return _createClass(CacheBase,[{key:"storage",value:function(e,t){return t?this.plus?plus.storage.setItem(e,t):window.localStorage.setItem(e,t):this.plus?plus.storage.getItem(e):window.localStorage.getItem(e)}},{key:"isEmpty",value:function(){return!this.storage(this.key)}},{key:"clear",value:function(){return this.storage(this,key,"")}},{key:"get",value:function(e){var t=this.storage(this.key)||'{"type":"_null"}';return t=this._getAfter(t),e&&e(t),t}},{key:"set",value:function(e,t){var n=this._setBefore(e);return this.storage(this.key,n),t&&t(n),n}},{key:"_getAfter",value:function _getAfter(op){op=JSON.parse(op);var cs={_string:function(e){return e},_number:function(e){return+e},_boolean:function(e){return"true"===e},_undefined:function(e){},_object:function(e){return JSON.parse(e)},_function:function _function(val){return eval("("+val+")")},_array:function(e){return JSON.parse(e)},_date:function(e){return new Date(e)},_regexp:function(e){return new RegExp(e)},_null:function(e){return null}};return cs[op.type](op.value)}},{key:"_setBefore",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t="_"+Object.prototype.toString.call(e).slice(8,-1).toLowerCase();return function(e,n){var i={_string:function(e){return e},_number:function(e){return e},_boolean:function(e){return e?"true":"false"},_undefined:function(e){return"undefined"},_object:function(e){return JSON.stringify(e)},_function:function(e){return e.toString()},_array:function(e){return JSON.stringify(e)},_date:function(e){return e.getTime()},_regexp:function(e){return e.toString().replace(/[(^\/)|($\/)]/g,"")},_null:function(e){return"null"}};return JSON.stringify({type:t,value:i[n](e)})}(e,t)}}]),CacheBase}(),Cache=function(e){function t(){var e;_classCallCheck(this,t);for(var n=arguments.length,i=Array(n),r=0;r<n;r++)i[r]=arguments[r];return _possibleConstructorReturn(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(i)))}return _inherits(t,e),_createClass(t,[{key:"plus",value:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.plus=e}},{key:"push",value:function(){var e=this.data;return!!Array.isArray(e)&&(e.push.apply(e,arguments),void(this.data=e))}},{key:"data",get:function(){return this.get()},set:function(e){return this.set(e)}}]),t}(CacheBase);return Cache}();exports.default=Cache},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){var e=function(){function e(t,i,r){n(this,e),this.id=t,this.url=i.url,this.options=i,this.groupContext=r,this.webview=!1,this.inited=!1}return i(e,[{key:"createWebview",value:function(e){var t=this.options,n=this.groupContext.other;if(t.styles=t.styles||{top:"83px",bottom:"0px",render:"always"},t.styles.popGesture="none",this.webview){this.webview.setStyle(t.styles);for(var i in t.extras)this.webview[i]=t.extras[i]}else t.styles.left="100%","startAnimation"!==e&&(t.styles.left="0",n.showWaiting&&plus.nativeUI.showWaiting()),this.webview=plus.webview.create(this.url,this.id,t.styles,t.extras),plus.webview.currentWebview().append(this.webview);this._initWebview(),this.inited=!0}},{key:"_initWebview",value:function(){var e=this,t=this.options;if(this.webview&&(this.webview.addEventListener("rendering",function(){setTimeout(function(){plus.nativeUI.closeWaiting()},500)}),t.pullToRefresh&&t.pullToRefresh.support&&support.pullToRefresh())){var n=t.pullToRefresh.callback;this.webview.setPullToRefresh(t.pullToRefresh,function(){if(n)n(e.webview);else{var t=function e(){var t=this;setTimeout(function(){t.webview.endPullToRefresh()},1e3),this.webview.removeEventListener("titleUpdate",e)};e.webview.addEventListener("titleUpdate",t),e.webview.reload()}})}}}]),e}(),t=function(){function t(e,i){var r=i.items,o=void 0===r?[]:r,a=i.index,s=void 0===a?0:a,u=i.styles,l=void 0===u?{}:u,c=i.onChange,f=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},v=f.showWaiting,h=void 0!==v&&v;n(this,t),c=c||function(){},this.id=e,this.options={items:o,index:s,styles:l,onChange:c},this.other={showWaiting:h},this.styles=l,this.items=o,this.onChange=c,this.webviews={},this.webviewContexts={},this.currentWebview=!1,this._init()}return i(t,[{key:"_init",value:function(){this._initParent(),this._initNativeView(),this._initWebviewContexts(this.options.index)}},{key:"_initParent",value:function(){this.parent=plus.webview.getWebviewById(this.id),this.parent||(this.parent=plus.webview.create(this.id,this.id),this.parent.show("none"))}},{key:"_initNativeView",value:function(){this.nativeView=new plus.nativeObj.View("__W2A_TAB_NATIVE",{top:"56px",left:"100%",width:"100%",backgroudColor:"#ffffff",opacity:0}),this.nativeView.show()}},{key:"_initWebviewContexts",value:function(){for(var t=this.items.length,n=t-1;n>=0;n--){var i=this.items[n],r=i.id,o=0===n,a=n===t-1,s=this.options.index===n,u=i.extras;u.__wap2app_url=i.url,u.__wap2app_index=n,u.__wap2app_left=o?"":this.items[n-1].id,u.__wap2app_right=a?"":this.items[n+1].id;var l=i.styles||{};n>this.options.index?l.left="100%":n<this.options.index?l.left="-100%":l.left="0";var c=new e(r,i,this);this.webviewContexts[r]=c,s&&(c.webview=plus.webview.getWebviewById(r),c.createWebview(),c.webview.show("none"),this._initDrags(c.webview),this.currentWebview=c.webview)}}},{key:"_initDrag",value:function(e,t){var n="__wap2app_drag_"+t+"_flag";if(!e[n]){var i=e["__wap2app_"+("left"===t?"right":"left")];if(i){var r=plus.webview.getWebviewById(i);r?e[n]=!0:r=this.nativeView,e.drag({direction:t,moveMode:"followFinger"},{view:r,moveMode:"follow"},function(n){"end"===n.type&&n.result&&this._dragCallback(t,e,r,i)}.bind(this))}else e[n]=!0}}},{key:"_initDrags",value:function(e){this._initDrag(e,"left"),this._initDrag(e,"right")}},{key:"_onChange",value:function(e){this.currentWebview=e,this.onChange({index:e.__wap2app_index})}},{key:"_dragCallback",value:function(e,t,n,i){if(n===this.nativeView){this.webviewContexts[i].createWebview("drag");var r=this.webviewContexts[i].webview;r.show(),this.nativeView.setStyle({left:"100%"}),this._initDrags(r),this._onChange(r),this._checkDrags(r)}else this._onChange(n)}},{key:"_checkDrags",value:function(e){var t=e.__wap2app_left,n=e.__wap2app_right;if(t){var i=plus.webview.getWebviewById(t);i&&!i.__wap2app_drag_left_flag&&this._initDrag(i,"left")}if(n){var r=plus.webview.getWebviewById(n);r&&!r.__wap2app_drag_right_flag&&this._initDrag(r,"right")}}},{key:"getCurrentWebview",value:function(){return this.currentWebview}},{key:"getCurrentWebviewContext",value:function(){return!!this.currentWebview&&this.webviewContexts[this.currentWebview.id]}},{key:"switchTab",value:function(e){e=e.replace("_0","");var t=this.currentWebview;if(e!==t.id){var n=this.webviewContexts[e],i=n.webview,r="100%",o="-100%";n.options.extras.__wap2app_index>t.__wap2app_index&&(r="-100%",o="100%");var a=!1;i||(a=!0,n.createWebview("startAnimation"),i=n.webview,i.show(),this._initDrags(i),this._checkDrags(i)),plus.webview.startAnimation({view:t,styles:{fromLeft:"0",toLeft:r},action:"show"},{view:i,styles:{fromLeft:o,toLeft:"0"},action:"show"},function(e){e.id===i.id&&(a&&this.other.showWaiting&&plus.nativeUI.showWaiting(),this.currentWebview=i,this.onChange({index:i.__wap2app_index}))}.bind(this))}}}]),t}();return t}();e.exports=r},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){var e={},t=void 0,r=function(){function r(e,t){var i=t.items,o=void 0===i?[]:i,a=t.index,s=void 0===a?0:a,u=t.onChange,l=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},c=l.showWaiting,f=void 0!==c&&c;n(this,r),u=u||function(){},this.id=e,this.options={items:o,index:s,onChange:u},this.other={showWaiting:f},this.items=o,this.onChange=u,this._init()}return i(r,[{key:"_init",value:function(){this._initParent(),this._initWebviewContexts()}},{key:"_initParent",value:function(){this.parent=plus.webview.getWebviewById(this.id),this.parent||(this.parent=plus.webview.create(this.id,this.id),this.parent.show("none"))}},{key:"_initWebviewContexts",value:function(){var t=null;for(var n in this.items)t=this.items[n],t.index=+n,e[t.id]=t,this.options.index===+n&&this.switchTab(t.id)}},{key:"switchTab",value:function(n){var i=e[n];n=i.id;var r=plus.webview.getWebviewById(n);r?r.isVisible()||r.show("none"):(r=plus.webview.create(i.url,n,i.styles,i.extras),r.hide(),this.parent.append(r),r.show("none")),t&&plus.webview.hide(t),t=n,this.onChange({index:i.index})}}]),r}();return r}();e.exports=r},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=t.url,r=void 0===i?"":i,o=t.id,a=void 0===o?r:o,s=t.extras,u=void 0===s?{}:s;n(this,e),this.isShow=!1,this.options={url:r,id:a,extras:u},this.createMenu(),this._initEvent()}return i(e,[{key:"show",value:function(){plus.webview.startAnimation({view:this.menuv,styles:{fromLeft:"-70%",toLeft:"0"}},{view:this.indexv,styles:{fromLeft:"0",toLeft:"70%"}}),this._onend({progress:"100",direction:"right"})}},{key:"hide",value:function(){plus.webview.startAnimation({view:this.menuv,styles:{fromLeft:"0",toLeft:"-70%"}},{view:this.indexv,styles:{fromLeft:"70%",toLeft:"0"}}),this._onend({progress:"100",direction:"left"})}},{key:"createMenu",value:function(){this.menuv=plus.webview.create(this.options.url,this.options.id,{left:"-70%",width:"70%",popGesture:"none",render:"always"},this.options.extras),this.indexv=plus.webview.currentWebview()}},{key:"_initEvent",value:function(){var e=this;this.menuv.addEventListener("titleUpdate",function(){e.menuv.show("none"),e.indexv.drag({direction:"right",moveMode:"followFinger"},{view:e.menuv,moveMode:"follow"},function(t){var n="_on"+t.type;e[n]&&e[n](t)}),e.menuv.drag({direction:"left",moveMode:"followFinger"},{view:e.indexv,moveMode:"follow"},function(t){var n="_on"+t.type;e[n]&&e[n](t)})}),this.indexv.addEventListener("maskClick",function(t){e.hide()})}},{key:"_onend",value:function(e){if("100"===e.progress){var t="rgba(0,0,0,0.15)",n=!0;"left"===e.direction&&(t="none",n=!1),this.indexv.setStyle({mask:t}),this.isShow=n}}}]),e}();e.exports=r},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){function e(){n(this,e)}return i(e,[{key:"processImage",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){};if("string"==typeof e)e=[e];else if(!Array.isArray(e))return n({message:"Please check the incoming image"});this._zipImgs(e,function(e){n(null,e)},0,t)}},{key:"_calcProportion",value:function(e,t){if(t<=1)return t;var n=1;return e>t&&(n=+(t/e).toFixed(4)),n}},{key:"_zipImgs",value:function(e,t){var n=this,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,o=e[i];return o?void this._getFileSize(o,function(a,s){s=100*n._calcProportion(s,r),plus.zip.compressImage({src:o,dst:"_doc/tempImg/"+Date.now()+"_"+i+".jpg",overwrite:!0,format:"jpg",quality:s,rotate:0},function(o){e[i]=o.target,n._zipImgs(e,t,++i,r)},function(o){e[i]=!1,n._zipImgs(e,t,++i,r)})}):t&&t(e)}},{key:"_getFileSize",value:function(e,t){plus.io.resolveLocalFileSystemURL(e,function(e){e.isFile||t({message:"Picture path error"}),e.getMetadata(function(e){t(null,e.size/1024)},t)},t)}}]),e}();e.exports=r},function(e,t){"use strict";var n=function(e){var t=/complete|loaded|interactive/;return t.test(document.readyState)?setTimeout(e,0):document.addEventListener("DOMContentLoaded",e),this},i=function(e){window.plus?setTimeout(e,0):document.addEventListener("plusready",e,!1)};e.exports={ready:n,plusReady:i}},function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=function(){var e=void 0;return function(t){return t&&(e=t),e}}(),o={wxhy:"WXSceneSession",wxpyq:"WXSceneTimeline",qq:"qq",sinaweibo:"sinaweibo"},a=function(){function e(t,i,r,o){n(this,e),this.config={type:t,fn:i,op:r,context:o},this._initCallback(),this.start()}return i(e,[{key:"_initCallback",value:function(){this.ShareCallBack=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return this.config.fn.apply(this.config.context,t)}}},{key:"start",value:function(){var e=this;this.getService(this.config.type,function(t){e.sendShare(t,function(){e.ShareCallBack(null,t)})})}},{key:"sendShare",value:function(e,t){var n=this,i=this._getShareInfo(e);e.send(i,function(){t()},function(t){n.ShareCallBack(t,e)})}},{key:"_getShareInfo",value:function(e){var t={extra:{scene:o[this.config.type]},href:this.config.op.href,title:this.config.op.title,content:this.config.op.content,pictures:[this.config.op.img],thumbs:[this.config.op.img]};return t.href||(delete t.title,delete t.content),t}},{key:"_getAuth",value:function(e,t){var n=this;e.authenticated?t():e.authorize(function(){t()},function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return n.ShareCallBack.apply(null,t)})}},{key:"_getService",value:function(e,t){~e.toString().indexOf("wx")&&(e="weixin");var n=r();for(var i in n)if(console.log(JSON.stringify(n[i])),e===n[i].id)return t&&t(n[i]),n[i]}},{key:"getService",value:function(e,t){var n=this;return r()?this._getService(e,t):void this._getHtml5PlusServices(function(i){r(i),n._getService(e,t)})}},{key:"_getHtml5PlusServices",value:function(e){var t=this;plus.share.getServices(function(t){e(t)},function(e){t.ShareCallBack(e,null)})}}]),e}();e.exports=a},function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}}]);