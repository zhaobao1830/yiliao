import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import plugins from 'lin/utils/plugins'
import filters from 'lin/filter'

import Lin1px from 'components/base/line/lin-1px'
import LButton from '@/components/base/button/lin-button'
import LButtonGroup from '@/components/base/button/lin-button-group'
import LIcon from '@/components/base/icon/lin-icon'
import AuthorizeDirective from 'lin/directives/authorize'
import '@/assets/styles/index.scss'

// 全局过滤器
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(plugins)
Vue.use(AuthorizeDirective)

Vue.component('lin-1px', Lin1px)
Vue.component('l-button', LButton)
Vue.component('l-button-group', LButtonGroup)
Vue.component('l-icon', LIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
