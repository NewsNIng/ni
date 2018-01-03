
export const ready = function (fn) {
	let readyRE = /complete|loaded|interactive/
	if (readyRE.test(document.readyState)) {
		fn()
	} else {
		document.addEventListener('DOMContentLoaded', function(){
			fn()
		}, false)
	}
	return this
}

export const plusReady = function(fn){
    if (window.plus) {
			setTimeout(function() { //解决callback与plusready事件的执行时机问题(典型案例:showWaiting,closeWaiting)
				fn()
			}, 0)
    } else {
			document.addEventListener("plusready", function() {
				fn()
			}, false)
    }
}

