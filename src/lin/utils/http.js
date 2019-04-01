import axios from 'axios'
import config from '@/config'
import tip from 'lin/utils/exception'
import store from 'store'
import { getToken } from './cookie'

// 创建一个拥有通用配置的axios实例
const http = axios.create({
  baseURL: config.baseUrl,
  transformResponse: [(data) => JSON.parse(data)], // 对返回的json进行处理
  timeout: 5000 // 请求超时
})

// 添加一个请求拦截器
http.interceptors.request.use(
  (requestConfig) => {
    if (requestConfig.url === 'cms/user/refresh') {
      const refreshToken = getToken('refresh_token')
      if (refreshToken) {
        requestConfig.headers.Authorization = refreshToken
        return requestConfig
      }
    } else {
      // 有access_token
      const accessToken = getToken('access_token')
      if (accessToken) {
        requestConfig.headers.Authorization = accessToken
        return requestConfig
      }
    }
    return requestConfig
  },
  (error) => Promise.reject(error)
)

http.interceptors.request.use(
  (requestConfig) => {
     store.commit('SET_STOP_TIME', new Date().getTime())
     return requestConfig
  },
  (error) => Promise.reject(error)
)

// 返回结果处理
http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    tip(error)
  }
)

export default http

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function post(url, data = {}, params = {}) {
  return http({
    method: 'post',
    url,
    data,
    params
  })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function get(url, params = {}) {
  return http({
    method: 'get',
    url,
    params
  })
}

/**
* @param {string} url
* @param {object} data
* @param {object} params
*/
export function put(url, data = {}, params = {}) {
  return http({
    method: 'put',
    url,
    params,
    data
  })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete(url, params = {}) {
  return http({
    method: 'delete',
    url,
    params
  })
}

export async function refreshRequest(response) {
  return http(response)
}
