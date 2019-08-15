const util = {
}
export default util

util.inOf = function(arr, targetArr) {
    let res = true
    arr.forEach(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false
        }
    })
    return res
}

util.oneOf = function(ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true
    } else {
        return false
    }
}
// 日期格式化
Date.prototype.format = function(format) {
    const o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "H+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length))
        }
    }
    return format
}
// 日期格式转换
util.formatDateTime = (timeStamp) => {
    if (!timeStamp) return ""
    const date = new Date()
    date.setTime(timeStamp * 1)
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ("0" + m) : m
    let d = date.getDate()
    d = d < 10 ? ("0" + d) : d
    let h = date.getHours()
    h = h < 10 ? ("0" + h) : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? ("0" + minute) : minute
    second = second < 10 ? ("0" + second) : second
    return y + "-" + m + "-" + d + " " + h + ":" + minute + ":" + second
}
util.msToDate = function(ms, format) {
    if (ms) {
        const d = new Date(ms)
        return d.format(format || "yyyy-MM-dd")
    } else {
        return ""
    }
}

String.prototype.trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "")
}

util.trimTar = function(tar) {
    for (const item in tar) {
        if (typeof tar[item] === "string") {
            tar[item] = tar[item].trim()
        }
    }
    return tar
}
// 清除字符串中所有空格
util.clearSpace = val => {
    return String(val).replace(/\s*/g, "")
}
// 去除首尾空格
util.clearRoundSpace = val => {
    if (val) {
        return String(val).replace(/(^\s*)|(\s*)$/g, "")
    }
    return ""
}
// 手机号码校验
util.phoneNumberJudge = val => {
    const v = val.replace(/\s/g, "")
    // return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
    return !!v.match(/^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/)
}
// 邮箱校验
util.emailJudge = val => {
    const v = val.replace(/\s/g, "")
    return !!v.match(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/)
}
// 密码校验
util.passwordJudge = val => {
    const v = val.replace(/\s/g, "")
    const re = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/
    return re.test(v)
}
// 坐席编号校验
util.seatNumberJudge = val => {
    const v = val.replace(/\s/g, "")
    const re = /^[0-9]+(.[0-9]{10,10})?$/
    return re.test(v)
}

// tree遍历
util.treeCount = (data, callback, depth = 0, sum = 0) => {
    let treeInfo = {
    }
    for (let i = 0; i < data.length; i++) {
        const children = data[i].children || [
        ]
        sum++
        if (callback) {
            callback(data[i], depth)
        }
        if (children.length > 0) {
            depth++
            treeInfo = util.treeCount(data[i].children, callback, depth, sum)
            depth = treeInfo.depth - 1
        }
        sum = treeInfo.sum || sum
    }
    return {
        depth: depth,
        sum: sum
    }
}

/**
 * @method
 * @param {Object} data three对象
 * @param {Object} findInfo 查找对象
 * @param {function} 遍历的毁掉
 * @param {Number} depth 深度
 * @returns {Object} 返回查找的节点
 * @desc tree查找
 */
util.treeFind = (data, findInfo, callback, depth = 0) => {
    let _find = false
    for (let i = 0; i < data.length && !_find; i++) {
        if (findInfo.val === data[i][findInfo.key]) {
            return {
                root: data,
                node: data[i],
                index: i,
                depth: depth
            }
        }
        if (callback) {
            callback(data[i])
        }
        const children = data[i].children || [
        ]
        if (children.length > 0) {
            depth++
            _find = util.treeFind(data[i].children, findInfo, callback, depth)
            depth--
        }
    }
    return _find
}

/**
 * @method
 * @param {Number} length 长度
 * @returns {String} 随机数
 * @desc 生成随机数
 */
util.random = (length) => {
    let str = Math.random().toString(36).substr(2)
    if (str.length >= length) {
        return str.substr(0, length)
    }
    str += util.random(length - str.length)
    return str
}

/**
 * @method
 * @param {Object} obj 对象
 * @returns {Object} 返回对象
 * @desc 深度拷贝
 */
util.deepCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * @method
 * @param {Array} arr 数组
 * @param {String} name 值
 * @returns {void}
 * @desc 数组对象去重
 */
util.arrayUnique = (arr, name) => {
    const hash = {
    }
    return arr.reduce((item, next) => {
        hash[next[name]] ? "" : hash[next[name]] = true && item.push(next)
        return item
    }, [
    ])
}

/**
 * @method
 * @param {Object} obj 对象
 * @param {String} value 查找值
 * @returns {String} 返回key
 * @desc 遍历对象查找value，返回对应的key
 */
util.findKey = (obj, value) => {
    if (obj) {
        for (const key in obj) {
            if (obj[key] === value) {
                return key
            }
        }
    }
    return false
}

/**
 * @method
 * @param {String} timestamp 时间戳
 * @desc 时间戳转日期
 */
util.timestampToTime = (timestamp) => {
    const date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
    const Y = date.getFullYear() + "-"
    const M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-"
    const D = date.getDate() + " "
    const h = date.getHours() + ":"
    const m = date.getMinutes() + ":"
    const s = date.getSeconds()
    return Y + M + D + h + m + s
}

/**
 * @method
 * @param {Object} obj 对象
 * @desc 判断是否为空对象
 */
util.isEmpty = (obj) => {
    if (Object.keys(obj).length === 0) {
        return true
    } else {
        return false
    }
}

/**
 * @method
 * @param {string} "www.taobao.com?key0=a&&key1=b&&key2=c"
 * @desc new parseQueryString(url)返回查询字符串对象
 */
util.parseQueryString = (url) => {
    const str = url.split("?")[1],
        items = str.split("&&")
    let arr, name, value
    const obj = {
    }
    for (let i = 0, l = items.length; i < l; i++) {
        arr = items[i].split("=")
        name = arr[0]
        value = arr[1]
        obj[name] = value
    }
    return obj
}

/**
 * @method 判断是否为正整数
 * @param val
 */
util.isInt = (val) => {
    const reg = /^[1-9]\d*$/
    return reg.test(val)
}

/**
 * @method 判断两个数组是否有相同元素
 * @param a b 为需要判断是否有相同元素的两个数组
 */
util.hasSameEl = (a, b) => {
    if (!a || !b) {
        return false
    }
    for (let i = 0; i < a.length; i++) {
        if (b.indexOf(a[i]) > -1) {
            return true
        }
    }
    return false
}

/**
 * @method 判断两个对象是否相等
 * @param a b 为需要判断是否有相同元素的两个对象
 */
util.isObjectEqual = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b)
}
