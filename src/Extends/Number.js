const np = Number.prototype


/**
 * 阿拉伯转中文
 * 目前我只做了十位数的处理...
 */
np.toChinase = function () {
    const chinaseArr = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
    if (isNaN(this)) {
        return ''
    }
    var y, c

    y = this % 10
    c = parseInt(this / 10)

    var n = ''
    if (c > 0) {
        n += chinaseArr[chinaseArr.length - 1]
    }
    if (c === 1) {
        c = 0
    }
    n = chinaseArr[c] + n + chinaseArr[y]

    return n
}