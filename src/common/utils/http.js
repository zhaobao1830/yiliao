import axios from 'axios'
import config from 'common/config'
import tip from 'common/utils/exception'

// 创建一个拥有通用配置的axios实例
const http = axios.create({
  baseURL: config.baseUrl,
  transformResponse: [(data) => JSON.parse(data)], // 对返回的json进行处理
  timeout: 5000 // 请求超时
})

// 返回结果处理
http.interceptors.response.use(
  res => res.data,
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
