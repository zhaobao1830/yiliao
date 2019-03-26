import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import Lin1px from 'components/base/line/lin-1px'

import 'assets/styles/index.scss'

Vue.config.productionTip = false

Vue.use(ElementUI)

Vue.component('lin-1px', Lin1px)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
