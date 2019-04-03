import Vue from 'vue'
import User from '../models/user'
import { refreshRequest } from './http'
import store from '../../store'

export async function handleException(res) {
  // 将本次失败请求保存
  const { params, url, method } = res.config
  store.commit('SET_REFERSH_OPTION', {
    params,
    url,
    method
  })

  // 处理 API 异常
  let { error_code, msg } = res.data // eslint-disable-line
  if (msg instanceof Object) {
    let showMsg = ''
    Object.getOwnPropertyNames(msg).forEach((key, index) => {
      if (index === 0) {
        showMsg = msg[key] // 如果是数组，展示第一条
      }
    })
    msg = showMsg
  }
  // 令牌相关，刷新令牌
  if (error_code === 10000 || error_code === 10040 || error_code === 10050) {
    // TODO: 重试一次，待优化
    if (!sessionStorage.getItem('flag')) {
      sessionStorage.setItem('flag', true)
      await User.getRefreshToken()
      const result = await refreshRequest(store.state.refreshOptions)
      return result
    }
  }

  Vue.prototype.$message({
    message: msg || '未知的error_code',
    type: 'error'
  })
  throw new Error(res)
}

export function handleError(error) {
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
  throw new Error(error)
}
