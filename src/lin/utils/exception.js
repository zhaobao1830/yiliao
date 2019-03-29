import Vue from 'vue'
import errorCode from '@/config/error-code'

export default function tip(error) {
  // 处理 network fail 异常
  if (!error.response) {
    Vue.prototype.$notify({
      title: 'Network Error',
      dangerouslyUseHTMLString: true,
      message: '<strong class="my-notify">请检查 API 是否异常</strong>'
    })
  }

  // 判断请求超时
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    Vue.prototype.$message({
      type: 'warning',
      message: '请求超时'
    })
  }

  // 处理 API 异常
  let { error_code, msg } = error.response.data
  if (msg instanceof Object) {
    let showMsg = ''
    Object.getOwnPropertyNames(msg).forEach((key, index) => {
      if (index === 0) {
        showMsg = msg[key]
      }
    })
    msg = showMsg
  }
  switch (error_code) {
    case 10050: // 令牌过期
      break
    case 10040: // 无效token
      console.warn('无效token', error.response.data)
      break
    case 10020: // 没有找到相关日志
      Vue.prototype.$notify({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: `<strong class="my-notify">${msg}</strong>`
      })
      break
    case 10000: // 无权限
      Vue.prototype.$notify({
        title: '无权限',
        dangerouslyUseHTMLString: true,
        message: `<strong class="my-notify">${msg}</strong>`
      })
      throw new Error(msg)
    case 10030: // 参数错误
      Vue.prototype.$message({
        type: 'error',
        message: `${msg}`
      })
      throw new Error(msg)
    case 10060: // 字段重复
      Vue.prototype.$message({
        type: 'error',
        message: `${msg}`
      })
      throw new Error(msg)
    case 10070: // 不可操作
      Vue.prototype.$message({
        type: 'error',
        message: `${msg}`
      })
      throw new Error(msg)
    default:
      Vue.prototype.$message({
        message: errorCode[error_code] || '未知的error_code',
        type: 'error'
      })
  }
}
