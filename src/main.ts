import Vue from 'vue'
import './plugins/function-api.js'
import './plugins/element-ui.js'
import App from './App.vue'
import router from './router'
import { store } from './store'
import apolloProvider from './apollo'
import 'normalize.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')
