let Utils = {}
/**
 * 生成随机len位数字
 */
Utils.randomLenNum = function (len, date) {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, typeof len === 'number' ? len : 4)
  if (date) random = random + Date.now()
  return random
}

/**
 * 节流函数
 * @param {*} func 函数体
 * @param {*} wait 延时
 */
Utils.throttle = (func, wait = 50) => {
  // 上一次执行该函数的时间
  let lastTime = 0
  return function (...args) {
    // 当前时间
    const now = new Date()
    // 将当前时间和上一次执行函数时间对比
    // 如果差值大于设置的等待时间就执行函数
    if ((now - lastTime) > wait) {
      lastTime = now
      func.apply(this, args)
    }
  }
}

function type(obj) {
  const { toString } = Object.prototype
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  return map[toString.call(obj)]
}
/**
 * 深度遍历，深拷贝
 * @param {*} data
 */
Utils.deepClone = (data) => {
  const t = type(data)
  let o
  let i
  let ni

  if (t === 'array') {
    o = []
  } else if (t === 'object') {
    o = {}
  } else {
    return data
  }

  if (t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(Utils.deepClone(data[i]))
    }
    return o
  } else if (t === 'object') {
    for (i in data) {
      o[i] = Utils.deepClone(data[i])
    }
    return o
  }
  return data
}
export default Utils
