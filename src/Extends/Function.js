
const fp = Function.prototype

/**
 * 函数柯里化处理
 */
fp.curry = function _curry(...args) {
	if(args.length >= this.length) {
		return this(...args)
	}
	return(...args2) => {
		return _curry.apply(this, [...args, ...args2])
	}
}



/**
 * 二分法查找 
 */
fp.twoFind = function () {
    let _arr, _wantValue,
        _twoFind = function (left, right) {
            if (left > right) {
                return -1
            }
            let min = Math.floor((left + right) / 2)
            if (_arr[min] > _wantValue) {
                return _twoFind(left, min - 1)
            } else if (_arr[min] < _wantValue) {
                return _twoFind(min + 1, right)
            }
            return min

        }
    return function (arr = [], val, left = 0, right = arr.length - 1) {
        _arr = arr
        _wantValue = val
        return _twoFind(left, right)
    }
}()

