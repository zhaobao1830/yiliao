import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

// TODO: 处理持久化
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({ // eslint-disable-line
    tabs: state.tabs,
    logined: state.logined,
    user: state.user,
    auths: state.auths,
  })
})

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  // plugins: debug ? [createLogger()] : []
  plugins: [debug ? createLogger() : '', vuexLocal.plugin]
})
