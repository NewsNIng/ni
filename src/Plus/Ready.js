
const ready = function (fn) {
	let readyRE = /complete|loaded|interactive/
	if (readyRE.test(document.readyState)) {
		fn()
	} else {
		document.addEventListener('DOMContentLoaded', fn)
	}
	return this
}

const plusReady = function(fn){
    if (window.plus) {
		fn()
    } else {
      document.addEventListener("plusready", fn, false)
    }
}


module.exports = {
    ready,
    plusReady
}