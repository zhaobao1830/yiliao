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
  },

  [types.SET_DEFAULT_ACTIVE_TAB](state, payload) {
    state.defaultActive = payload
  },

  [types.ADD_TAB](state, payload) {
    if (!(payload instanceof Array)) {
      const { tabs } = state
      const flag = tabs.find(el => el.path === payload.path)
      console.log(payload)
      if (!flag) {
        state.tabs.push(payload)
      }
    } else {
      state.tabs = []
    }
  },

  [types.ADD_MENU_TAB](state, tabs) {
    state.menuTabs = tabs
  },

  [types.REMOVE_TAB](state, payload) {
    state.tabs.splice(payload, 1)
  }
}

export default mutations
