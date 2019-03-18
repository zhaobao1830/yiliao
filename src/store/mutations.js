import * as types from './mutation-types'

const mutations = {
  [types.SET_LOGINED](state) {
    state.logined = true
  },
  [types.REMOVE_LOGINED](state) {
    state.logined = false
  },
  [types.SET_USER](state, payload) {
    state.user = payload
  }
}

export default mutations
