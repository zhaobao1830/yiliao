import * as types from './mutation-types'
import { removeToken } from '@/lin/utils/cookie'

export const setUserAndState = function ({ commit }, user) {
  // 如果登陆成功，设置logined标志位
  commit(types.SET_LOGINED, true)
  // 设置全局用户状态
  commit(types.SET_USER, user)
}

export const loginOut = function ({ commit }) {
  removeToken()
  commit(types.ADD_TAB, [])
  commit(types.REMOVE_LOGINED, false)
}

export const addTabs = async function ({ state, commit }, payload) {
  const { tabs } = state
  const flag = await tabs.find(el => el.path === payload.path)
  if (!flag) {
    commit(types.ADD_TAB, payload)
  }
}
