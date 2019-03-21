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

export default Utils