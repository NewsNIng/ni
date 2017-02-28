const dp = Date.prototype

/**
 * yyyy-MM-dd hh:mm:ss
 * @param {Object} formatString
 * yyyy-MM-dd
 * yyyy/MM/dd hh:mm:ss
 */
dp.toFormatString = function (formatString) {
    let yyyy = this.getFullYear(),
        MM = this.getMonth() + 1,
        dd = this.getDate(),
        hh = this.getHours(),
        mm = this.getMinutes(),
        ss = this.getSeconds()

    MM = MM > 9 ? "" + MM : "0" + MM
    dd = dd > 9 ? "" + dd : "0" + dd
    hh = hh > 9 ? "" + hh : "0" + hh
    mm = mm > 9 ? "" + mm : "0" + mm
    ss = ss > 9 ? "" + ss : "0" + ss

    return formatString.replace("yyyy", yyyy)
        .replace("MM", MM)
        .replace("dd", dd)
        .replace("hh", hh)
        .replace("mm", mm)
        .replace("ss", ss)
}

/**
 * 多少小时前、多少分钟前、多少秒前
 * @param {Object} time
 * 1421313395359 时间戳
 * 2015-10-22 具体时间
 */
dp.ago = function () {
    if (!arguments.length) return ''
    let arg = arguments,
        now = this.getTime(),
        past = !isNaN(arg[0]) ? arg[0] : new Date(arg[0]).getTime(),
        diffValue = now - past,
        result = '',
        minute = 1000 * 60,
        hour = minute * 60,
        day = hour * 24,
        halfamonth = day * 15,
        month = day * 30,
        year = month * 12,

        _year = diffValue / year,
        _month = diffValue / month,
        _week = diffValue / (7 * day),
        _day = diffValue / day,
        _hour = diffValue / hour,
        _min = diffValue / minute

    if (_year >= 1) result = parseInt(_year) + "年前"
    else if (_month >= 1) result = parseInt(_month) + "个月前"
    else if (_week >= 1) result = parseInt(_week) + "周前"
    else if (_day >= 1) result = parseInt(_day) + "天前"
    else if (_hour >= 1) result = parseInt(_hour) + "个小时前"
    else if (_min >= 1) result = parseInt(_min) + "分钟前"
    else result = "刚刚"
    return result
}