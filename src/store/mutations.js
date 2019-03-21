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
  },
  [types.SET_STOP_TIME](state, currentTime) {
    state.stopTime = currentTime
  },
  [types.SET_USER_AUTHS](state, auths) {
    const _auths = []
    for (let i = 0; i < auths.length; i++) {
      for (const key in auths[i]) {
        for (let j = 0; j < auths[i][key].length; j++) {
          _auths.push(auths[i][key][j].auth)
        }
      }
    }
    state.auths = _auths
  }
}

export default mutations
