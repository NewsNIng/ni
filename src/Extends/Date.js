const dp = Date.prototype

/**
 * yyyy-MM-dd hh:mm:ss
 * @param {Object} formatString
 * yyyy-MM-dd
 * yyyy/MM/dd hh:mm:ss
 */
dp.toFormatString = function (format) {
    if (!format) {
        format = "yyyy-MM-dd hh:mm:ss";
    }

    var o = {
        "M+": this.getMonth() + 1,  // month
        "d+": this.getDate(),       // day
        "H+": this.getHours(),      // hour
        "h+": this.getHours(),      // hour
        "m+": this.getMinutes(),    // minute
        "s+": this.getSeconds(),    // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }

    return format;
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