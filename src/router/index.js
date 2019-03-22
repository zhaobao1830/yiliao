import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '../store'

const notLoginComponents = ['login']

Vue.use(Router)

function isLoginRequired(name) {
  const matched = notLoginComponents.find(el => el === name)
  if (matched) {
    return false
  }
  return true
}

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  if (isLoginRequired(to.name) && !store.state.logined) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router
